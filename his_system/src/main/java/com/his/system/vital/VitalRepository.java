package com.his.system.vital;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VitalRepository extends JpaRepository<Vital, Long> {

    // 방문별 Vital 목록 (최신순)
    List<Vital> findAllByVisitIdOrderByMeasuredAtDesc(Long visitId);

    // 방문별 최신 Vital
    Vital findTopByVisitIdOrderByMeasuredAtDesc(Long visitId);
}
