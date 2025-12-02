package com.his.system.systemlog;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/system_log")
@RequiredArgsConstructor
public class SystemLogController {

    private final SystemLogService systemLogService;

    // 로그 기록
    @PostMapping("/create")
    public SystemLog createLog(@RequestParam(required = false) Long staffId,
                               @RequestParam String actionType,
                               @RequestParam(required = false) Long targetId,
                               @RequestParam(required = false) String description) {

        return systemLogService.createLog(staffId, actionType, targetId, description);
    }

    // 전체 로그 조회
    @GetMapping("/list")
    public List<SystemLog> getAllLogs() {
        return systemLogService.getAllLogs();
    }

    // 직원별 로그 조회
    @GetMapping("/staff/{staffId}")
    public List<SystemLog> getLogsByStaff(@PathVariable Long staffId) {
        return systemLogService.getLogsByStaff(staffId);
    }

    // 특정 대상 ID 로그 조회
    @GetMapping("/target/{targetId}")
    public List<SystemLog> getLogsByTarget(@PathVariable Long targetId) {
        return systemLogService.getLogsByTarget(targetId);
    }
}
