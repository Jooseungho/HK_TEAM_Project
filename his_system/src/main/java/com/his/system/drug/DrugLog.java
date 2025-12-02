package com.his.system.drug;

import com.his.system.staff.Staff;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "DRUG_LOG")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DrugLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "LOG_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "DRUG_ID", nullable = false)
    private Drug drug;

    @ManyToOne
    @JoinColumn(name = "STAFF_ID", nullable = false)
    private Staff staff;

    @Enumerated(EnumType.STRING)
    @Column(name = "CHANGE_TYPE", nullable = false)
    private DrugChangeType changeType;

    @Column(name = "QUANTITY", nullable = false)
    private Integer quantity;

    @Column(name = "MEMO", length = 255)
    private String memo;

    @Column(name = "CREATED_AT")
    private LocalDateTime createdAt;
}
