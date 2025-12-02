package com.his.system.record;

import com.his.system.visit.Visit;
import com.his.system.staff.Staff;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "MEDICAL_RECORD")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RECORD_ID")
    private Long id;

    // VISIT FK
    @ManyToOne
    @JoinColumn(name = "VISIT_ID", nullable = false)
    private Visit visit;

    // DOCTOR FK
    @ManyToOne
    @JoinColumn(name = "DOCTOR_ID", nullable = false)
    private Staff doctor;

    @Column(name = "SUBJECTIVE", columnDefinition = "TEXT")
    private String subjective;

    @Column(name = "OBJECTIVE", columnDefinition = "TEXT")
    private String objective;

    @Column(name = "ASSESSMENT", columnDefinition = "TEXT")
    private String assessment;

    @Column(name = "PLAN", columnDefinition = "TEXT")
    private String plan;

    @Column(name = "DIAGNOSIS_NAME", length = 200)
    private String diagnosisName;

    @Column(name = "ICD10_CODE", length = 20)
    private String icd10Code;

    @Column(name = "CREATED_AT")
    private LocalDateTime createdAt;

    @Column(name = "UPDATED_AT")
    private LocalDateTime updatedAt;
}
