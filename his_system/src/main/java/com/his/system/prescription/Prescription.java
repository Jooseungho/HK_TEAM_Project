package com.his.system.prescription;

import com.his.system.visit.Visit;
import com.his.system.staff.Staff;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    @ManyToOne
    @JoinColumn(name = "VISIT_ID", nullable = false)
    private Visit visit;

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


    // ------------------------------------------------
    // ⭐ 반드시 추가해야 하는 부분 (items 리스트 + 초기화)
    // ------------------------------------------------
    @OneToMany(mappedBy = "prescription", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<PrescriptionItem> items = new ArrayList<>();

}
