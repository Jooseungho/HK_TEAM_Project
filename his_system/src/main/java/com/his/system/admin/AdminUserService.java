package com.his.system.admin;

import com.his.system.staff.Staff;
import com.his.system.staff.StaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminUserService {

    private final StaffRepository staffRepository;

    /* =========================
       계정 생성
    ========================= */
    public void createUser(CreateUserRequest request) {

        // 초기 비밀번호 = 전화번호 (하이픈 제거)
        String initPassword = request.getPhone().replace("-", "");

        Staff staff = Staff.builder()
                .employeeNo(request.getEmployeeNo())
                .name(request.getName())
                .role(request.getRole())
                .phone(request.getPhone())
                .email(request.getEmail())
                .password(initPassword)
                .active(1)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        staffRepository.save(staff);
    }

    /* =========================
       전체 계정 조회
    ========================= */
    public List<UserDTO> getAllUsers() {
        return staffRepository.findAll()
                .stream()
                .map(UserDTO::fromEntity)
                .collect(Collectors.toList());
    }

    /* =========================
       단건 조회 (수정 폼 채우기용)
    ========================= */
    public UserDTO getUser(String employeeNo) {
        Staff staff = staffRepository.findByEmployeeNo(employeeNo)
                .orElseThrow(() -> new RuntimeException("사용자 없음"));
        return UserDTO.fromEntity(staff);
    }

    /* =========================
       계정 수정
    ========================= */
    public void updateUser(String employeeNo, CreateUserRequest request) {
        Staff staff = staffRepository.findByEmployeeNo(employeeNo)
                .orElseThrow(() -> new RuntimeException("계정 없음"));

        staff.setName(request.getName());
        staff.setRole(request.getRole());
        staff.setEmail(request.getEmail());
        staff.setPhone(request.getPhone());
        staff.setUpdatedAt(LocalDateTime.now());

        staffRepository.save(staff);
    }

    
    /*===========================
     * 계정 삭제
     ===========================*/
     public void deleteUser(String employeeNo) {
         staffRepository.deleteByEmployeeNo(employeeNo);
     }

}
