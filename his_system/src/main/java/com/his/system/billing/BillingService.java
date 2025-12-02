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
                .orElseThrow(() -> new RuntimeException("내원 정보를 찾을 수 없습니다."));

        Billing billing = Billing.builder()
                .visit(visit)
                .totalAmount(totalAmount)
                .paid(0) // 미결제 상태
                .createdAt(LocalDateTime.now())
                .build();

        return billingRepository.save(billing);
    }

    // 결제 처리
    public Billing payBilling(Long billingId) {

        Billing billing = billingRepository.findById(billingId)
                .orElseThrow(() -> new RuntimeException("수납 정보를 찾을 수 없습니다."));

        billing.setPaid(1);
        billing.setPaidAt(LocalDateTime.now());

        return billingRepository.save(billing);
    }

    // 단일 조회
    public Billing getBilling(Long id) {
        return billingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("수납 정보를 찾을 수 없습니다."));
    }

    // 전체 조회
    public List<Billing> getAllBillings() {
        return billingRepository.findAll();
    }

    // 내원별 수납 조회
    public Billing getBillingByVisit(Long visitId) {
        return billingRepository.findAll().stream()
                .filter(b -> b.getVisit().getId().equals(visitId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("해당 내원의 수납 정보 없음"));
    }
}
