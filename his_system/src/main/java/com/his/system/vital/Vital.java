package com.his.system.vital;

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
@Table(name = "VITAL")
public class Vital {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "VITAL_ID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "VISIT_ID", nullable = false)
    private Visit visit;

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

    @Column(name = "MEMO")
    private String memo;

    @Column(name = "MEASURED_AT")
    private LocalDateTime measuredAt;
}
