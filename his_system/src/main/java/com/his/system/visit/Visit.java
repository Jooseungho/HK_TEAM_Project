package com.his.system.visit;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.his.system.patient.Patient;
import com.his.system.staff.Staff;

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

    @ManyToOne
    @JoinColumn(name = "DOCTOR_ID")
    @JsonIgnore 
    private Staff doctor;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS")
    private VisitStatus status;

    @Column(name = "REGISTERED_AT")
    private LocalDateTime arrivalTime;

    @Column(name = "CALLED_AT")
    private LocalDateTime callTime;

    @Column(name = "STARTED_AT")
    private LocalDateTime startTime;

    @Column(name = "FINISHED_AT")
    private LocalDateTime endTime;

}
