package com.his.system.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public AuthResponseDto login(
            @RequestBody AuthRequestDto request,
            HttpSession session
    ) {
        AuthResponseDto response = authService.login(request);

        // 🔥 세션에 로그인 정보 저장
        session.setAttribute("LOGIN_EMPLOYEE_NO", response.getEmployeeNo());
        session.setAttribute("LOGIN_ROLE", response.getRole());

        return response;
    }

}