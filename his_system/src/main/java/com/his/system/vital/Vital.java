// 🔹 Vital.java (nurseId를 String employeeNo로 저장)
package com.his.system.vital;

import com.his.system.staff.Staff;
import com.his.system.visit.Visit;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Vital {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "VITAL_ID") // ⭐ 핵심
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "VISIT_ID", nullable = false)
	private Visit visit;

	@Column(name = "NURSE_EMPLOYEE_NO", nullable = false)
	private String nurseEmployeeNo;

	private Integer bpSystolic;
	private Integer bpDiastolic;
	private Integer heartRate;
	private Double temperature;
	private Integer respiration;
	private Integer spo2;

	private String memo;

	private LocalDateTime measuredAt;
}
