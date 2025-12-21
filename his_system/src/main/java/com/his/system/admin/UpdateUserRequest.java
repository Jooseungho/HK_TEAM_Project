package com.his.system.admin;

import com.his.system.staff.StaffRole;
import lombok.Getter;

@Getter
public class UpdateUserRequest {
    private String name;
    private StaffRole role;
    private String phone;
    private String email;
}
