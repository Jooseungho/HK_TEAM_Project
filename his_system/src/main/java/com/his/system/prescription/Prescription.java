package com.his.system.prescription;

import com.his.system.visit.Visit;
import com.his.system.staff.Staff;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "PRESCRIPTION")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PRESCRIPTION_ID")
    private Long id;

    // VISIT FK
    @ManyToOne
    @JoinColumn(name = "VISIT_ID", nullable = false)
    private Visit visit;

    // DOCTOR FK
    @ManyToOne
    @JoinColumn(name = "DOCTOR_ID", nullable = false)
    private Staff doctor;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS")
    private PrescriptionStatus status;

    @Column(name = "NOTE", length = 255)
    private String note;

    @Column(name = "CREATED_AT")
    private LocalDateTime createdAt;

    @Column(name = "UPDATED_AT")
    private LocalDateTime updatedAt;
}
