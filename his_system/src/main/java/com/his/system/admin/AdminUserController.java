package com.his.system.admin;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminUserController {

    private final AdminUserService adminUserService;

    // 1️⃣ 계정 생성
    @PostMapping("/users")
    public ResponseEntity<Void> createUser(@RequestBody CreateUserRequest request) {
        adminUserService.createUser(request);
        return ResponseEntity.ok().build();
    }

    // 2️⃣ 계정 전체 조회
    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(adminUserService.getAllUsers());
    }

 // 계정 수정
    @PutMapping("/users/{employeeNo}")
    public ResponseEntity<Void> updateUser(
            @PathVariable String employeeNo,
            @RequestBody UpdateUserRequest request
    ) {
        adminUserService.updateUser(employeeNo, request);
        return ResponseEntity.ok().build();
    }

    // 계정 삭제
    @DeleteMapping("/users/{employeeNo}")
    public ResponseEntity<Void> deleteUser(
            @PathVariable String employeeNo
    ) {
        adminUserService.deleteUser(employeeNo);
        return ResponseEntity.ok().build();
    }


    // 5️⃣ 활성 / 비활성 변경
    @PatchMapping("/users/{employeeNo}/status")
    public ResponseEntity<Void> updateUserStatus(
            @PathVariable String employeeNo,
            @RequestParam boolean active
    ) {
        adminUserService.changeActive(employeeNo, active);
        return ResponseEntity.ok().build();
    }
}
