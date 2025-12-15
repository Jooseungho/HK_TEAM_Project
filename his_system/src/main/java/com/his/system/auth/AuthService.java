package com.his.system.auth;

import com.his.system.config.JwtProvider;
import com.his.system.staff.Staff;
import com.his.system.staff.StaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final StaffRepository staffRepository;
    private final JwtProvider jwtProvider;

    public AuthResponseDto login(AuthRequestDto request) {

        Staff staff = staffRepository.findByEmployeeNo(request.getEmployeeNo())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 직원 번호입니다."));

        // ✅ 활성 계정 체크
        if (staff.getActive() != 1) {
            throw new RuntimeException("비활성화된 계정입니다. 관리자에게 문의하세요.");
        }

        // ✅ 평문 + 하이픈 제거 비교
        String inputPw = request.getPassword().replace("-", "");
        String savedPw = staff.getPassword().replace("-", "");

        if (!inputPw.equals(savedPw)) {
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
