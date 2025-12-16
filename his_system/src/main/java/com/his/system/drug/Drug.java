package com.his.system.drug;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "DRUG")
@Getter @Setter
public class Drug {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "DRUG_ID")
    private Long id;

    private String name;
    private String unit;

    @Column(name = "STOCK_QUANTITY")
    private int stockQuantity;

    @Column(name = "MIN_STOCK")
    private int minStock;

    private int price;
}
