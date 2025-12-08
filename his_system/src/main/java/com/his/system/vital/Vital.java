package com.his.system.vital;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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

    // VISIT FK (정상)
    @OneToOne
    @JoinColumn(name = "VISIT_ID", nullable = false)
    @JsonIgnoreProperties({"vital"})
    private Visit visit;

    // NURSE ID → 단순 Long 값
    @Column(name = "NURSE_ID", nullable = false)
    private Long nurseId;

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
