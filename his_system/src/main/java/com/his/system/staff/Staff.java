// 🔹 Staff.java (엔티티)
package com.his.system.staff;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Staff {

	@Id
	@Column(name = "STAFF_ID")
	private Long staffId; // 🔥 이게 핵심

	@Column(name = "EMPLOYEE_NO", unique = true)
	private String employeeNo;
	private String Phone;
	private String email;
	private String name;
	private String password;
	@Enumerated(EnumType.STRING)
	
	@Column(name = "ROLE")
	private StaffRole role;

	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	private int active;
}