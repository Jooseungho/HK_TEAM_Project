package com.his.system.systemlog;

import com.his.system.staff.Staff;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SystemLogResponseDto {

    private Long logId;
    private String employeeNo;
    private String staffName;
    private String actionType;
    private Long targetId;
    private String description;
    private LocalDateTime createdAt;

    public static SystemLogResponseDto from(SystemLog log) {

        Staff staff = log.getStaff();

        String employeeNo = "알 수 없음";
        String staffName = "알 수 없음";

        if (staff != null) {
            employeeNo = staff.getEmployeeNo();

            if (!staff.isActive()) {
                staffName = "퇴사한 직원 (" + staff.getName() + ")";
            } else {
                staffName = staff.getName();
            }
        }

        return SystemLogResponseDto.builder()
                .logId(log.getLogId())
                .employeeNo(employeeNo)
                .staffName(staffName)
                .actionType(log.getActionType())
                .targetId(log.getTargetId())
                .description(log.getDescription())
                .createdAt(log.getCreatedAt())
                .build();
    }
}
