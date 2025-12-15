package com.his.system.staff;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StaffService {

    private final StaffRepository staffRepository;

    public List<StaffDTO> getAllStaff() {
        return staffRepository.findAll().stream()
                .map(StaffDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public StaffDTO getStaffByEmployeeNo(String employeeNo) {
        Staff staff = staffRepository.findByEmployeeNo(employeeNo)
                .orElseThrow(() -> new RuntimeException("해당 직원번호의 직원을 찾을 수 없습니다."));
        return StaffDTO.fromEntity(staff);
    }
}
