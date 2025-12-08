package com.his.system.vital;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VitalRepository extends JpaRepository<Vital, Long> {

    // visit 1개 → vital 1개
    Vital findByVisitId(Long visitId);

    // visit 1개 → vital 여러 개 가능 (시간순)
    List<Vital> findAllByVisitIdOrderByMeasuredAtDesc(Long visitId);
    Vital findTopByVisitIdOrderByMeasuredAtDesc(Long visitId);

}
