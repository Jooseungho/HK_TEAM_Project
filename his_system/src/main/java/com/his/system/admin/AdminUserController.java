package com.his.system.admin;

import com.his.system.staff.StaffDTO;
import com.his.system.staff.StaffService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminUserController {

    private final StaffService staffService;

    @GetMapping("/users")
    public List<StaffDTO> getAllUsers() {
        return staffService.getAllStaff()
                .stream()
                .map(StaffDTO::from)
                .toList();
    }

    @PostMapping("/createUser")
    public void create(@RequestBody CreateUserRequest req) {
        staffService.createStaff(req.toEntity());
    }
}
