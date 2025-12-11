package com.his.system.staff;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class StaffDTO {

    private Long id;
    private String employeeNo;
    private String name;
    private String role;
    private String email;
    private String phone;
    private Integer active;

    public static StaffDTO from(Staff s) {
        return StaffDTO.builder()
                .id(s.getId())
                .employeeNo(s.getEmployeeNo())
                .name(s.getName())
                .role(s.getRole().name())
                .email(s.getEmail())
                .phone(s.getPhone())
                .active(s.getActive())
                .build();
    }
}
