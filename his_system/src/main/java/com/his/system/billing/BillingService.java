package com.his.system.billing;

import com.his.system.visit.Visit;
import com.his.system.visit.VisitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BillingService {

    private final BillingRepository billingRepository;
    private final VisitRepository visitRepository;

    // 수납 생성
    public Billing createBilling(Long visitId, Integer totalAmount) {

        Visit visit = visitRepository.findById(visitId)
                .orElseThrow(() -> new RuntimeException("내원 정보 없음"));

        Billing billing = Billing.builder()
                .visit(visit)
                .totalAmount(totalAmount)
                .paid(0)
                .createdAt(LocalDateTime.now())
                .build();

        return billingRepository.save(billing);
    }

    // 결제 처리
    public Billing payBilling(Long billingId) {

        Billing billing = billingRepository.findById(billingId)
                .orElseThrow(() -> new RuntimeException("수납 정보 없음"));

        billing.setPaid(1);
        billing.setPaidAt(LocalDateTime.now());

        return billingRepository.save(billing);
    }

    public List<BillingResponse> getWaiting() {
        return billingRepository.findByPaid(0)
                .stream()
                .map(b -> new BillingResponse(
                        b.getId(),                              // billingId
                        b.getVisit().getId(),                   // visitId
                        b.getVisit().getPatient().getId(),
                        b.getVisit().getPatient().getName(),
                        b.getVisit().getPatient().getChartNo(),
                        b.getTotalAmount()
                ))
                .toList();
    }

    public List<BillingResponse> getCompleted() {
        return billingRepository.findByPaid(1)
                .stream()
                .map(b -> new BillingResponse(
                        b.getId(),
                        b.getVisit().getId(),
                        b.getVisit().getPatient().getId(),
                        b.getVisit().getPatient().getName(),
                        b.getVisit().getPatient().getChartNo(),
                        b.getTotalAmount()
                ))
                .toList();
    }

}
