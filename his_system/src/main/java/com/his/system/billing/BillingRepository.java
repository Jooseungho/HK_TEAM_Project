package com.his.system.billing;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BillingRepository extends JpaRepository<Billing, Long> {

    // 수납 대기
    List<Billing> findByPaid(Integer paid);

    // 내원별 조회 (기존 유지 가능)
    Billing findByVisit_Id(Long visitId);
}
