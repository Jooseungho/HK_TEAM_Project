package com.his.system.prescription.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter @Setter
public class PrescriptionRequest {
    private String note;                // 의사 메모
    private List<DrugRequest> drugs;    // 약물 리스트
    private List<TreatmentRequest> treatments; // 처치 리스트
}
