package com.his.system.admin;

import com.his.system.staff.Staff;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserDTO {

    private Long id;
    private String empId;
    private String name;
    private String role;
    private String email;
    private String phone;
    private Integer active;

    public static UserDTO from(Staff s) {
        return UserDTO.builder()
                .id(s.getId())
                .empId(s.getEmployeeNo())
                .name(s.getName())
                .role(s.getRole().name())
                .email(s.getEmail())
                .phone(s.getPhone())
                .active(s.getActive())
                .build();
    }
}
