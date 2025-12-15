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

    /* 계정 생성 */
    @PostMapping("/users")
    public ResponseEntity<Void> createUser(@RequestBody CreateUserRequest request) {
        adminUserService.createUser(request);
        return ResponseEntity.ok().build();
    }

    /* 전체 조회 */
    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(adminUserService.getAllUsers());
    }

    /* 단건 조회 (수정용) */
    @GetMapping("/users/{employeeNo}")
    public ResponseEntity<UserDTO> getUser(@PathVariable String employeeNo) {
        return ResponseEntity.ok(adminUserService.getUser(employeeNo));
    }

    /* 수정 */
    @PutMapping("/users/{employeeNo}")
    public ResponseEntity<Void> updateUser(
            @PathVariable String employeeNo,
            @RequestBody CreateUserRequest request) {

        adminUserService.updateUser(employeeNo, request);
        return ResponseEntity.ok().build();
    }
    
    @DeleteMapping("/users/{employeeNo}")
    public ResponseEntity<Void> deleteUser(@PathVariable String employeeNo) {
        adminUserService.deleteUser(employeeNo);
        return ResponseEntity.ok().build();
    }

}
