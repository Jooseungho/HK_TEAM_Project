package com.his.system.admin;

import com.his.system.staff.Staff;
import com.his.system.staff.StaffRepository;
import com.his.system.staff.StaffRole;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminUserService {

    private final StaffRepository staffRepository;
    private final BCryptPasswordEncoder encoder;

    // 전체 직원 조회
    public List<UserDTO> getAllUsers() {
        return staffRepository.findAll()
                .stream()
                .map(UserDTO::from)
                .toList();
    }

    public void createUser(CreateUserRequest req) {

        Staff staff = Staff.builder()
                .employeeNo(req.getEmpId())
                .name(req.getName())
                .role(StaffRole.valueOf(req.getRole()))
                .phone(req.getPhone())
                .email(req.getEmail())        // ← 이메일 추가
                .password(encoder.encode(req.getPhone()))  // ⭐ 초기 비밀번호 = 연락처
                .active(1)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        staffRepository.save(staff);
    }

}
