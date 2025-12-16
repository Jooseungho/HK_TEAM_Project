package com.his.system.systemlog;

import com.his.system.auth.AuthResponseDto;
import com.his.system.staff.Staff;
import com.his.system.staff.StaffRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Aspect
@Component
@Order(1)
@RequiredArgsConstructor
public class SystemLogAspect {

    private final SystemLogRepository logRepository;
    private final StaffRepository staffRepository;
    private final HttpServletRequest request;

    @Around("@annotation(systemLoggable)")
    public Object log(
            ProceedingJoinPoint joinPoint,
            SystemLoggable systemLoggable
    ) throws Throwable {

        Object result;

        // 🔥 1. 비즈니스 로직 실행 (여기서 모든 성공/실패 결정)
        result = joinPoint.proceed();

        // 🔥 2. 아래는 "부가 작업" (실패해도 절대 영향 X)
        try {
            Staff staff = (Staff) request.getSession().getAttribute("LOGIN_STAFF");

            // 로그인 직후 보완
            if (staff == null && result instanceof AuthResponseDto response) {
                staff = staffRepository
                        .findByEmployeeNo(response.getEmployeeNo())
                        .orElse(null);
            }

            if (staff != null) {
                Long targetId = null;

                if (systemLoggable.targetIndex() >= 0) {
                    Object[] args = joinPoint.getArgs();
                    if (systemLoggable.targetIndex() < args.length) {
                        Object target = args[systemLoggable.targetIndex()];
                        if (target instanceof Long) {
                            targetId = (Long) target;
                        }
                    }
                }

                SystemLog log = SystemLog.builder()
                        .staff(staff)
                        .actionType(systemLoggable.action().name())
                        .targetId(targetId)
                        .description(
                                systemLoggable.description().isEmpty()
                                        ? systemLoggable.action().getLabel()
                                        : systemLoggable.description()
                        )
                        .createdAt(LocalDateTime.now())
                        .build();

                logRepository.save(log);
            }

        } catch (Exception e) {
            // 🔒 로그 실패는 절대 비즈니스 로직에 영향 주면 안 됨
            System.err.println("[SystemLogAspect] 로그 저장 실패: " + e.getMessage());
        }

        // 🔥 3. return은 단 한 번
        return result;
    }
}
