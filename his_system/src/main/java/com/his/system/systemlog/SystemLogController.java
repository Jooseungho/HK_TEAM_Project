package com.his.system.systemlog;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/system-logs")
@RequiredArgsConstructor
public class SystemLogController {

    private final SystemLogService systemLogService;

    @GetMapping
    public List<SystemLog> listAll() {
        return systemLogService.getAllLogs();
    }

    @GetMapping("/staff/{employeeNo}")
    public List<SystemLog> byStaff(@PathVariable String employeeNo) {
        return systemLogService.getLogsByStaff(employeeNo);
    }

    @GetMapping("/target/{targetId}")
    public List<SystemLog> byTarget(@PathVariable Long targetId) {
        return systemLogService.getLogsByTarget(targetId);
    }
}