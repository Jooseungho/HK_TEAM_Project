package com.his.system.admin;

import com.his.system.staff.Staff;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserDTO {

    private String employeeNo;
    private String name;
    private String phone;
    private String email;
    private String role;

    public static UserDTO fromEntity(Staff staff) {
        return UserDTO.builder()
                .employeeNo(staff.getEmployeeNo())
                .name(staff.getName())
                .phone(staff.getPhone())
                .email(staff.getEmail())
                .role(staff.getRole().name())
                .build();
    }
}
