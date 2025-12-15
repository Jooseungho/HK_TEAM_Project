// AdminUserController.java
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


@PostMapping("/users")
public ResponseEntity<Void> createUser(@RequestBody CreateUserRequest request) {
adminUserService.createUser(request);
return ResponseEntity.ok().build();
}


@GetMapping("/users")
public ResponseEntity<List<UserDTO>> getAllUsers() {
List<UserDTO> users = adminUserService.getAllUsers();
return ResponseEntity.ok(users);
}
}