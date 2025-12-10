package com.his.system.nurse;

import com.his.system.prescription.Prescription;
import com.his.system.prescription.PrescriptionItem;
import com.his.system.prescription.PrescriptionItemType;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "NURSE_TASK")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NurseTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TASK_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "PRESCRIPTION_ID")
    private Prescription prescription;

    @ManyToOne
    @JoinColumn(name = "ITEM_ID")
    private PrescriptionItem item;

    @Column(name = "PATIENT_ID")
    private Long patientId;

    @Column(name = "VISIT_ID")
    private Long visitId;

    @Enumerated(EnumType.STRING)
    @Column(name = "ITEM_TYPE")
    private PrescriptionItemType itemType;

    @Column(name = "ITEM_NAME")
    private String itemName;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS")
    private NurseTaskStatus status;

    @Column(name = "CREATED_AT")
    private LocalDateTime createdAt;

    @Column(name = "DONE_AT")
    private LocalDateTime doneAt;
}
