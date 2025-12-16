package com.his.system.staff;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "STAFF")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Staff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "STAFF_ID")
    private Long staffId;   // 🔥 숫자 PK

    @Column(name = "EMPLOYEE_NO", length = 20, unique = true, nullable = false)
    private String employeeNo;  // 직원번호 (로그인 ID)

    private String name;

    @Enumerated(EnumType.STRING)
    private StaffRole role;

    private String phone;
    private String email;
    private String password;

    private int active;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

