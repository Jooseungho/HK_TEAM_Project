package com.his.system.billing;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BillingRepository extends JpaRepository<Billing, Long> {

    Optional<Billing> findByVisitId(Long visitId);
    
    List<Billing> findByPaidTrue();

}
