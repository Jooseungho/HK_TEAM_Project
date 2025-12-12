package com.his.system.staff;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class StaffDTO {
    private String employeeNo;
    private String name;
    private StaffRole role;
    private String phone;
    private String email;
    private Boolean active;

    public static StaffDTO fromEntity(Staff staff) {
        return StaffDTO.builder()
                .employeeNo(staff.getEmployeeNo())
                .name(staff.getName())
                .role(staff.getRole())
                .phone(staff.getPhone())
                .email(staff.getEmail())
                .build();
    }
}
