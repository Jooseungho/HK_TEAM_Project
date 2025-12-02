package com.his.system.auth;

import com.his.system.config.JwtProvider;
import com.his.system.staff.Staff;
import com.his.system.staff.StaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final StaffRepository staffRepository;
    private final JwtProvider jwtProvider;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthResponseDto login(AuthRequestDto request) {

        Staff staff = staffRepository.findByEmployeeNo(request.getEmployeeNo())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 직원 번호입니다."));

        if (!passwordEncoder.matches(request.getPassword(), staff.getPassword())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }

        String token = jwtProvider.createToken(staff.getId(), staff.getRole().name());

        return new AuthResponseDto(
                token,
                staff.getRole().name(),
                staff.getId()
        );
    }
}
