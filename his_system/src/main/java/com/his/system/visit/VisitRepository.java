package com.his.system.visit;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VisitRepository extends JpaRepository<Visit, Long> {

    List<Visit> findByStatusOrderByArrivalTimeAsc(VisitStatus status);
    
    List<Visit> findByStatusIn(List<VisitStatus> statuses);
    
    long countByStatus(VisitStatus status);
    
    List<Visit> findByStatus(VisitStatus status);

    long countByStatusIn(List<VisitStatus> statuses);


}
