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
    private Long id;

    @Column(name = "EMPLOYEE_NO", nullable = false, length = 30)
    private String employeeNo;

    @Column(name = "NAME", nullable = false, length = 50)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "ROLE", nullable = false)
    private StaffRole role;

    @Column(name = "PHONE", nullable = false, length = 20)
    private String phone;

    @Column(name = "PASSWORD", nullable = false, length = 255)
    private String password;

    @Column(name = "DEPARTMENT", length = 100)
    private String department;

    @Column(name = "ACTIVE")
    private Integer active;

    @Column(name = "CREATED_AT")
    private LocalDateTime createdAt;

    @Column(name = "UPDATED_AT")
    private LocalDateTime updatedAt;
}
