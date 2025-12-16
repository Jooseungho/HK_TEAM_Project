package com.his.system.auth;

import com.his.system.staff.Staff;
import com.his.system.staff.StaffRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final StaffRepository staffRepository;

    @PostMapping("/login")
    public AuthResponseDto login(
            @RequestBody AuthRequestDto request,
            HttpSession session
    ) {
        // 1️⃣ 기존 로그인 처리 (JWT 발급)
        AuthResponseDto response = authService.login(request);

        // 2️⃣ 🔥 로그용 Staff 세션 저장 (핵심)
        Staff staff = staffRepository.findByEmployeeNo(response.getEmployeeNo())
                .orElseThrow(() -> new RuntimeException("직원 조회 실패"));

        session.setAttribute("LOGIN_STAFF", staff);

        return response;
    }

    @PostMapping("/logout")
    public void logout(HttpSession session) {
        session.invalidate();
    }
}
