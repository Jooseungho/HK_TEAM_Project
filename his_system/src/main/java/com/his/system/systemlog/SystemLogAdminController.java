package com.his.system.systemlog;

import com.his.system.systemlog.SystemLogResponseDto;
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
}
