package com.his.system.drug;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DrugLogRepository extends JpaRepository<DrugLog, Long> {
    List<DrugLog> findByDrugId(Long drugId);
}
