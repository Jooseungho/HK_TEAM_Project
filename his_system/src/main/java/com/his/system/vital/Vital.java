package com.his.system.vital;

import com.his.system.visit.Visit;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "VITAL")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vital {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "VITAL_ID")
    private Long id;

    // VISIT FK (1 Visit : 1 Vital – 최신 기준)
    @OneToOne
    @JoinColumn(name = "VISIT_ID", nullable = false)
    private Visit visit;

    // 간호사 직원번호 (employeeNo)
    @Column(name = "NURSE_EMPLOYEE_NO", nullable = false)
    private String nurseEmployeeNo;

    @Column(name = "BP_SYSTOLIC")
    private Integer bpSystolic;

    @Column(name = "BP_DIASTOLIC")
    private Integer bpDiastolic;

    @Column(name = "HEART_RATE")
    private Integer heartRate;

    @Column(name = "TEMPERATURE")
    private Double temperature;

    @Column(name = "RESPIRATION")
    private Integer respiration;

    @Column(name = "SPO2")
    private Integer spo2;

    @Column(name = "MEMO", length = 255)
    private String memo;

    @Column(name = "MEASURED_AT", nullable = false)
    private LocalDateTime measuredAt;
}
