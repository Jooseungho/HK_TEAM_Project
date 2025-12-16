package com.his.system.systemlog;  // 🔥 반드시 PingController와 동일

import com.his.system.systemlog.LogTestService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LogTestController {

    private final LogTestService logTestService;

    @GetMapping("/test/system-log")
    public String testSystemLog() {
        logTestService.testLog();
        return "OK";
    }
}
