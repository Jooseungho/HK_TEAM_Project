package com.his.system.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthRequestDto {
    private String employeeNo;
    private String password;
}
