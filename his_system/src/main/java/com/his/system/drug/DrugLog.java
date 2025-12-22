package com.his.system.drug;

import com.his.system.staff.Staff;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "DRUG_LOG")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DrugLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "LOG_ID")
    private Long logId;

    @ManyToOne
    @JoinColumn(name = "DRUG_ID")
    private Drug drug;

    @ManyToOne
    @JoinColumn(name = "STAFF_ID")
    private Staff staff;

    @Enumerated(EnumType.STRING)
    private ChangeType changeType; // IN / OUT

    private int quantity;
    private String memo;

    private LocalDateTime createdAt;
}
