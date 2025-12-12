package com.his.system.dto;

import lombok.Getter;

@Getter
public class UserCreateRequestDto {
    private String empId;
    private String name;
    private String role;
    private String phone;
    private String email;
}
