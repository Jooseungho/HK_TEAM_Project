package com.his.system.systemlog;

import com.his.system.systemlog.SystemLog;
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
        return SystemLogResponseDto.builder()
                .logId(log.getLogId()) // 또는 getLogId()
                .employeeNo(log.getStaff().getEmployeeNo())
                .staffName(log.getStaff().getName())
                .actionType(log.getActionType())
                .targetId(log.getTargetId())
                .description(log.getDescription())
                .createdAt(log.getCreatedAt())
                .build();
    }
}
