package com.his.system.prescription.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class DrugRequest {
    private String name;       // 약품명
    private String dosage;     // 용량
    private String doseCount;  // 예: 1일 3회
    private int doseDays;      // 기간 (3일,5일,7일)
    private int total;         // 총 투약 횟수
}
