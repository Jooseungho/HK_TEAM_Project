package com.his.system.systemlog;

import org.springframework.stereotype.Service;

@Service
public class LogTestService {

    @SystemLoggable(action = SystemLogActionType.SYSTEM_ACCESS)
    public void testLog() {
        System.out.println("=== SystemLog AOP 테스트 실행 ===");
    }
}