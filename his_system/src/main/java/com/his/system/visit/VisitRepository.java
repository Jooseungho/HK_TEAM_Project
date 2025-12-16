package com.his.system.visit;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VisitRepository extends JpaRepository<Visit, Long> {

    // 대기 환자 목록 (접수 순)
    List<Visit> findByStatusOrderByArrivalTimeAsc(VisitStatus status);

    // 여러 상태 조회 (예: CALLED, IN_TREATMENT)
    List<Visit> findByStatusIn(List<VisitStatus> statuses);

    // 상태별 카운트
    long countByStatus(VisitStatus status);

    // 단일 상태 조회
    List<Visit> findByStatus(VisitStatus status);

    // 여러 상태 카운트
    long countByStatusIn(List<VisitStatus> statuses);
}
