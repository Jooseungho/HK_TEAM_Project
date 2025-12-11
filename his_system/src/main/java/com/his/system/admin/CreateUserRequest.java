package com.his.system.admin;

import com.his.system.staff.Staff;
import com.his.system.staff.StaffRole;
import lombok.Getter;

@Getter
public class CreateUserRequest {

    private String empId;   
    private String name;    
    private String role;    
    private String email;   
    private String phone;   

    /**  
     * CreateUserRequest → Staff 엔티티 변환  
     */
    public Staff toEntity() {
        return Staff.builder()
                .employeeNo(empId)
                .name(name)
                .role(StaffRole.valueOf(role))
                .phone(phone)
                .email(email)
                .password(phone)    // ⭐ 초기 비밀번호 = 연락처
                .active(1)
                .build();
    }
}
