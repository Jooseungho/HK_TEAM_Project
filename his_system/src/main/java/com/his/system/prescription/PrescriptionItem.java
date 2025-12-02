package com.his.system.prescription;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "PRESCRIPTION_ITEM")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PrescriptionItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ITEM_ID")
    private Long id;

    // PARENT PRESCRIPTION
    @ManyToOne
    @JoinColumn(name = "PRESCRIPTION_ID", nullable = false)
    private Prescription prescription;

    @Enumerated(EnumType.STRING)
    @Column(name = "ITEM_TYPE", nullable = false)
    private PrescriptionItemType itemType;

    @Column(name = "ITEM_NAME", nullable = false, length = 100)
    private String itemName;

    @Column(name = "DOSAGE", length = 50)
    private String dosage;

    @Column(name = "FREQUENCY", length = 50)
    private String frequency;

    @Column(name = "DURATION", length = 50)
    private String duration;

    @Column(name = "NOTE", length = 255)
    private String note;
}
