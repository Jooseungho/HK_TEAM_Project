package com.his.system.visit;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VisitRepository extends JpaRepository<Visit, Long> {

    List<Visit> findByStatusOrderByArrivalTimeAsc(VisitStatus status);
}
