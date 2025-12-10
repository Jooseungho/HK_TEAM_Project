package com.his.system.nurse;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NurseTaskRepository extends JpaRepository<NurseTask, Long> {

    List<NurseTask> findByStatus(NurseTaskStatus status);

    List<NurseTask> findByVisitId(Long visitId);

}
