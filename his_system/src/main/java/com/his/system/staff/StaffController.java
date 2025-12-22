package com.his.system.staff;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/staff")
@RequiredArgsConstructor
public class StaffController {

    private final StaffService staffService;

    @GetMapping
    public ResponseEntity<List<StaffDTO>> getAllStaff() {
        return ResponseEntity.ok(staffService.getAllStaff());
    }

    @GetMapping("/{employeeNo}")
    public ResponseEntity<StaffDTO> getStaffByEmployeeNo(
            @PathVariable String employeeNo
    ) {
        return ResponseEntity.ok(
                staffService.getStaffByEmployeeNo(employeeNo)
        );
    }
}