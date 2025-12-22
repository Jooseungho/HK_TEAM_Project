package com.his.system.billing;

import com.his.system.patient.Patient;
import com.his.system.prescription.PrescriptionItem;
import com.his.system.prescription.PrescriptionItemRepository;
import com.his.system.prescription.PrescriptionItemType;
import com.his.system.visit.Visit;
import com.his.system.visit.VisitRepository;
import com.his.system.visit.VisitStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class BillingService {

    private final BillingRepository billingRepository;
    private final VisitRepository visitRepository;
    private final PrescriptionItemRepository prescriptionItemRepository;

    /** 🟦 약품 + 처치 가격표 */
    private static final Map<String, Integer> PRICE_TABLE = new HashMap<>();
    static {
        // 💊 약물
        PRICE_TABLE.put("타이레놀 500mg", 1000);
        PRICE_TABLE.put("진해거담제", 2500);
        PRICE_TABLE.put("해열제", 1500);

        // 🩻 처치
        PRICE_TABLE.put("X-ray", 20000);

        // 💉 주사
        PRICE_TABLE.put("비타민 주사", 10000);
    }

    /** 🟦 VisitID 기반 자동 금액 계산 */
    public int calculateTotalAmount(Long visitId) {

        List<PrescriptionItem> items =
                prescriptionItemRepository.findByPrescription_Visit_Id(visitId);

        int total = 0;

        for (PrescriptionItem item : items) {

            String name = item.getItemName();
            PrescriptionItemType type = item.getItemType();

            if (PRICE_TABLE.containsKey(name)) {
                switch (type) {
                    case DRUG:
                    case PROCEDURE:
                    case INJECTION:
                        total += PRICE_TABLE.get(name);
                        break;
                    default:
                        break;
                }
            }
        }
        return total;
    }

    /** 🟦 수납 대기 목록 */
    public List<BillingResponse> findBillingWaitingList() {

        List<Visit> doneVisits = visitRepository.findByStatus(VisitStatus.DONE);

        return doneVisits.stream().map(v -> {

            int autoAmount = calculateTotalAmount(v.getId());

            Billing billing = billingRepository.findByVisitId(v.getId())
                    .orElseGet(() -> Billing.builder()
                            .visit(v)
                            .totalAmount(autoAmount)
                            .paid(false)
                            .build()
                    );

            billing.setTotalAmount(autoAmount);
            billingRepository.save(billing);

            Patient patient = v.getPatient();

            return new BillingResponse(
                    billing.getId(),
                    v.getId(),
                    patient.getId(),
                    patient.getName(),
                    patient.getChartNo(),
                    billing.getTotalAmount()
            );
        }).toList();
    }

    /** 🟦 결제 완료 처리 */
    public Billing completeBilling(Long billingId) {

        Billing billing = billingRepository.findById(billingId)
                .orElseThrow(() -> new RuntimeException("Billing not found"));

        billing.setPaid(true);
        billing.setPaidAt(LocalDateTime.now());

        Billing saved = billingRepository.save(billing);

        Visit visit = billing.getVisit();
        visit.setStatus(VisitStatus.PAID);
        visitRepository.save(visit);

        return saved;
    }

    /** 🟦 수납 완료 목록 */
    public List<BillingResponse> findBillingCompletedList() {

        List<Billing> completed = billingRepository.findByPaidTrue();

        return completed.stream().map(b -> {
            Visit v = b.getVisit();
            Patient p = v.getPatient();

            return new BillingResponse(
                    b.getId(),
                    v.getId(),
                    p.getId(),
                    p.getName(),
                    p.getChartNo(),
                    b.getTotalAmount()
            );
        }).toList();
    }

    /** 🆕 수납 상세 내역 조회 */
    public List<BillingItemResponse> getBillingItems(Long visitId) {

        List<PrescriptionItem> items =
                prescriptionItemRepository.findByPrescription_Visit_Id(visitId);

        return items.stream()
                .filter(i ->
                        i.getItemType() == PrescriptionItemType.DRUG ||
                        i.getItemType() == PrescriptionItemType.PROCEDURE ||
                        i.getItemType() == PrescriptionItemType.INJECTION
                )
                .map(i -> new BillingItemResponse(
                        i.getItemType().name(),
                        i.getItemName(),
                        PRICE_TABLE.getOrDefault(i.getItemName(), 0)
                ))
                .toList();
    }
}
