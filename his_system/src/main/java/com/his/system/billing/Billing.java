package com.his.system.billing;

import com.his.system.visit.Visit;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "BILLING")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Billing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BILL_ID")
    private Long id;

    @OneToOne
    @JoinColumn(name = "VISIT_ID", nullable = false)
    private Visit visit;

    @Column(name = "TOTAL_AMOUNT")
    private Integer totalAmount;

    @Column(name = "PAID")
    private Boolean paid;

    @Column(name = "PAID_AT")
    private LocalDateTime paidAt;
    
    @Column(name = "PRICE") // ⭐ 신설된 컬럼
    private Integer price;

}
