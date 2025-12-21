package com.his.system.admin;

import com.his.system.staff.Staff;
import com.his.system.staff.StaffRepository;
import com.his.system.staff.StaffRole;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminUserService {

    private final StaffRepository staffRepository;

    // ===============================
    // 1️⃣ 계정 생성
    // ===============================
    public void createUser(CreateUserRequest request) {

        Staff staff = Staff.builder()
                .employeeNo(request.getEmployeeNo())
                .name(request.getName())
                .role(request.getRole())
                .phone(request.getPhone())
                .email(request.getEmail())
                .password(request.getPhone()) // 🔥 평문 저장
                .active(true)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        staffRepository.save(staff);
    }

    // ===============================
    // 2️⃣ 전체 계정 조회
    // ===============================
    public List<UserDTO> getAllUsers() {
        return staffRepository.findAll().stream()
                .map(UserDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // ===============================
    // 3️⃣ 계정 수정
    // ===============================
    @Transactional
    public void updateUser(String employeeNo, UpdateUserRequest request) {
        Staff staff = staffRepository.findByEmployeeNo(employeeNo)
                .orElseThrow(() -> new RuntimeException("직원 없음"));

        if (request.getName() == null || request.getName().isBlank()) {
            throw new IllegalArgumentException("이름은 필수입니다.");
        }

        staff.setName(request.getName());
        staff.setRole(request.getRole());
        staff.setPhone(request.getPhone());
        staff.setEmail(request.getEmail());
        staff.setUpdatedAt(LocalDateTime.now());
    }

    // ===============================
    // 4️⃣ 계정 삭제
    // ===============================
    @Transactional
    public void deleteUser(String employeeNo) {
        Staff staff = staffRepository.findByEmployeeNo(employeeNo)
                .orElseThrow(() -> new RuntimeException("직원 없음"));

        if (staff.getRole() == StaffRole.ADMIN) {
            throw new IllegalStateException("관리자 계정은 삭제할 수 없습니다.");
        }

        staffRepository.delete(staff);
    }

    // ===============================
    // 5️⃣ 활성 / 비활성 변경
    // ===============================
    @Transactional
    public void changeActive(String employeeNo, boolean active) {
        Staff staff = staffRepository.findByEmployeeNo(employeeNo)
                .orElseThrow(() -> new RuntimeException("직원 없음"));

        staff.setActive(active);
        staff.setUpdatedAt(LocalDateTime.now());
    }
}
