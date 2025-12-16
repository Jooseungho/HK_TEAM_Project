package com.his.system.auth;

import com.his.system.config.JwtProvider;
import com.his.system.staff.Staff;
import com.his.system.staff.StaffRepository;
import com.his.system.systemlog.SystemLogActionType;
import com.his.system.systemlog.SystemLoggable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final StaffRepository staffRepository;
    private final JwtProvider jwtProvider;

    // 🔥 로그인 로그 자동 기록
    @SystemLoggable(action = SystemLogActionType.LOGIN)
    public AuthResponseDto login(AuthRequestDto request) {

        Staff staff = staffRepository.findByEmployeeNo(request.getEmployeeNo())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 직원 번호입니다."));

        if (!request.getPassword().equals(staff.getPassword())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }

        String token = jwtProvider.createToken(
                staff.getEmployeeNo(),
                staff.getRole().name()
        );

        return new AuthResponseDto(
                token,
                staff.getRole().name(),
                staff.getEmployeeNo(),
                staff.getName()
        );
    }
}
