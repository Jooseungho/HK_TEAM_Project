package com.his.system.systemlog;

import com.his.system.config.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/admin/system-logs")
@RequiredArgsConstructor
public class SystemLogAdminController {

    private final SystemLogAdminService systemLogAdminService;
    private final SystemLogService systemLogService;
    private final JwtProvider jwtProvider;   // ✅ 핵심 추가

    // 로그 조회
    @GetMapping
    public Page<SystemLogResponseDto> getSystemLogs(
            @RequestParam(required = false) String employeeNo,
            @RequestParam(required = false) String actionType,

            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            LocalDateTime from,

            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            LocalDateTime to,

            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return systemLogAdminService.searchLogs(
                employeeNo,
                actionType,
                from,
                to,
                page,
                size
        );
    }

    // 로그아웃 로그 기록
    @PostMapping("/logout-log")
    public void logoutLog(
            @RequestHeader("Authorization") String authorization
    ) {
        String token = authorization.replace("Bearer ", "");
        String employeeNo = jwtProvider.getEmployeeNo(token);

        systemLogService.createLog(
                employeeNo,
                SystemLogActionType.LOGOUT.name(),
                null,
                "로그아웃"
        );
    }
}