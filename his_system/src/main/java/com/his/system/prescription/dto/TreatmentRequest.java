package com.his.system.prescription.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class TreatmentRequest {
    private String type;    // 주사 / 처치
    private String name;    // 처치명
    private String memo;    // 특이사항
}
