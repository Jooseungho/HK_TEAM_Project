package com.his.system.visit;

import com.his.system.patient.Patient;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
public class Visit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "VISIT_ID")
    private Long id;

    // 환자 정보 (N:1)
    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    // 담당 의사 ID (optional)
    private Long doctorId;

    // 접수 상태
    @Enumerated(EnumType.STRING)
    private VisitStatus status;

    // 시간 정보
    private LocalDateTime arrivalTime; // 도착 시간
    private LocalDateTime callTime;    // 호출 시간
    private LocalDateTime startTime;   // 진료 시작
    private LocalDateTime endTime;     // 진료 종료

}
