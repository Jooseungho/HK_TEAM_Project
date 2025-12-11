package com.his.system.staff;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StaffService {

    private final StaffRepository staffRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    // 직원 생성
    public Staff createStaff(Staff staff) {

        // ⭐ 패스워드가 없으면 연락처로 초기 설정
        if (staff.getPassword() == null) {
            staff.setPassword(staff.getPhone());
        }

        // 암호화
        staff.setPassword(passwordEncoder.encode(staff.getPassword()));

        staff.setCreatedAt(LocalDateTime.now());
        staff.setUpdatedAt(LocalDateTime.now());

        return staffRepository.save(staff);
    }

    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    public Staff getStaff(Long id) {
        return staffRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("직원을 찾을 수 없습니다."));
    }
}
