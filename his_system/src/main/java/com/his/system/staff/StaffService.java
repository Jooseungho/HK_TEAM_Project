package com.his.system.staff;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StaffService {

    private final StaffRepository staffRepository;

    public List<StaffDTO> getAllStaff() {
        return staffRepository.findAll()
                .stream()
                .map(StaffDTO::from)
                .toList();
    }

    // 🔥 이 메서드가 없어서 오류가 난 것
    public StaffDTO getStaffByEmployeeNo(String employeeNo) {
        Staff staff = staffRepository.findByEmployeeNo(employeeNo)
                .orElseThrow(() ->
                        new RuntimeException("직원을 찾을 수 없습니다: " + employeeNo)
                );

        return StaffDTO.from(staff);
    }
}
