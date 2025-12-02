package com.his.system.staff;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/staff")
@RequiredArgsConstructor
public class StaffController {

    private final StaffService staffService;

    // 직원 생성 (관리자 기능)
    @PostMapping("/create")
    public Staff createStaff(@RequestBody Staff staff) {
        return staffService.createStaff(staff);
    }

    // 직원 전체 조회
    @GetMapping("/list")
    public List<Staff> getAllStaff() {
        return staffService.getAllStaff();
    }

    // 직원 상세 조회
    @GetMapping("/{id}")
    public Staff getStaff(@PathVariable Long id) {
        return staffService.getStaff(id);
    }
}
