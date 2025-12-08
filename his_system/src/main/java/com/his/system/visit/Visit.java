package com.his.system.visit;

import com.his.system.patient.Patient;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "VISIT")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Visit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "VISIT_ID")
    private Long id;

    // 환자 FK
    @ManyToOne
    @JoinColumn(name = "PATIENT_ID", nullable = false)
    private Patient patient;

    // 의사 ID (Staff FK)
    @Column(name = "DOCTOR_ID")
    private Long doctorId;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS")
    private VisitStatus status;

    @Column(name = "ARRIVAL_TIME")
    private LocalDateTime arrivalTime;

    @Column(name = "CALL_TIME")
    private LocalDateTime callTime;

    @Column(name = "START_TIME")
    private LocalDateTime startTime;

    @Column(name = "END_TIME")
    private LocalDateTime endTime;
}
