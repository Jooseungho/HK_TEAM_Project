package com.his.system.systemlog;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface SystemLogRepository
        extends JpaRepository<SystemLog, Long>,
                JpaSpecificationExecutor<SystemLog> {

    // 기존 기능 유지
    List<SystemLog> findByStaff_EmployeeNo(String employeeNo);

    List<SystemLog> findByTargetId(Long targetId);
}
