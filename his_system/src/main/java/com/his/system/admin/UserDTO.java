package com.his.system.admin;

import com.his.system.staff.Staff;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserDTO {

    private String employeeNo;
    private String name;
    private String role;
    private String phone;
    private String email;
    private int active;

    public static UserDTO fromEntity(Staff staff) {
        return UserDTO.builder()
                .employeeNo(staff.getEmployeeNo())
                .name(staff.getName())
                .role(staff.getRole().name())
                .phone(staff.getPhone())
                .email(staff.getEmail())
                .active(staff.getActive())
                .build();
    }
}
