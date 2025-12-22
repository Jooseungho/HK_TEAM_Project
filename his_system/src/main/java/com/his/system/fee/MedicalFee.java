package com.his.system.fee;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "MEDICAL_FEE")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalFee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;   // TREATMENT / DRUG 등
    private String name;
    private int price;
}
