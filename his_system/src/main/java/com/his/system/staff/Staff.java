package com.his.system.staff;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Staff {

    @Id
    @Column(length = 20)
    private String employeeNo;  // 직원번호를 PK로 사용

    private String name;

    @Enumerated(EnumType.STRING)
    private StaffRole role;

    private String phone;

    private String email;

    private String password;

    private int active;  // 1 = 활성화, 0 = 비활성화

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
