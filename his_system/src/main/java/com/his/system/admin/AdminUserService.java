package com.his.system.admin;

import com.his.system.admin.CreateUserRequest;
import com.his.system.staff.Staff;
import com.his.system.staff.StaffRepository;
import com.his.system.staff.StaffRole;
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
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void createUser(CreateUserRequest request) {
        String initPassword = passwordEncoder.encode(request.getPhone());  // 초기 비밀번호 = 전화번호

        Staff staff = Staff.builder()
                .employeeNo(request.getEmployeeNo())
                .name(request.getName())
                .role(StaffRole.valueOf(request.getRole()))   // 이미 enum
                .Phone(request.getPhone())
                .email(request.getEmail())
                .password(initPassword)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        

        staffRepository.save(staff);
        
        
    }
    public List<UserDTO> getAllUsers() {
    	return staffRepository.findAll().stream()
    			.map(UserDTO::fromEntity)
    			.collect(Collectors.toList());
    }
}
