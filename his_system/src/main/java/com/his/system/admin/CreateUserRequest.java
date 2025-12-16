// CreateUserRequest.java
package com.his.system.admin;


import com.his.system.staff.StaffRole;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class CreateUserRequest {
private String employeeNo;
private String name;
private String phone;
private String email;
private String role;
}