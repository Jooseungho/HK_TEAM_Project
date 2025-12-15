package com.his.system.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthResponseDto {
    private String token;
    private String role;
    private String employeeNo;
    private String name;
}
