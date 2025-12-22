package com.his.system.staff;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StaffDTO {

    private String employeeNo;
    private String name;
    private String role;
    private String phone;
    private String email;
    private boolean active;

    // 🔥 핵심: 이 메서드가 없어서 오류 발생
    public static StaffDTO from(Staff staff) {
        return new StaffDTO(
                staff.getEmployeeNo(),
                staff.getName(),
                staff.getRole().name(),
                staff.getPhone(),
                staff.getEmail(),
                staff.isActive()
        );
    }
}