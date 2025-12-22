package com.his.system.systemlog;

import com.his.system.staff.Staff;
import com.his.system.staff.StaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SystemLogService {

    private final SystemLogRepository logRepository;
    private final StaffRepository staffRepository;

    // 로그 저장 (직원 필수)
    public SystemLog createLog(
            String employeeNo,
            String actionType,
            Long targetId,
            String description
    ) {
        Staff staff = staffRepository.findByEmployeeNo(employeeNo)
                .orElseThrow(() -> new RuntimeException("직원 정보를 찾을 수 없습니다."));

        SystemLog log = SystemLog.builder()
                .staff(staff)
                .actionType(actionType)
                .targetId(targetId)
                .description(description)
                .createdAt(LocalDateTime.now())
                .build();

        return logRepository.save(log);
    }

    public List<SystemLog> getAllLogs() {
        return logRepository.findAll();
    }

    public List<SystemLog> getLogsByStaff(String employeeNo) {
        return logRepository.findByStaff_EmployeeNo(employeeNo);
    }

    public List<SystemLog> getLogsByTarget(Long targetId) {
        return logRepository.findByTargetId(targetId);
    }
}