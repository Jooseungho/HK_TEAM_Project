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

    // 로그 저장
    public SystemLog createLog(String employeeNo, String actionType, Long targetId, String description) {

        Staff staff = null;

        if (employeeNo != null) {
            staff = staffRepository.findByEmployeeNo(employeeNo)
                    .orElseThrow(() -> new RuntimeException("직원 정보를 찾을 수 없습니다."));
        }

        SystemLog log = SystemLog.builder()
                .staff(staff)
                .actionType(actionType)
                .targetId(targetId)
                .description(description)
                .createdAt(LocalDateTime.now())
                .build();

        return logRepository.save(log);
    }

    // 전체 로그 조회
    public List<SystemLog> getAllLogs() {
        return logRepository.findAll();
    }

    public List<SystemLog> getLogsByStaff(String employeeNo) {
        return logRepository.findAll().stream()
                .filter(log -> log.getStaff() != null && log.getStaff().getEmployeeNo().equals(employeeNo))
                .toList();
    }


    // 특정 대상(환자, 내원, 처방 등) 로그 조회
    public List<SystemLog> getLogsByTarget(Long targetId) {
        return logRepository.findAll().stream()
                .filter(log -> log.getTargetId() != null && log.getTargetId().equals(targetId))
                .toList();
    }
}
