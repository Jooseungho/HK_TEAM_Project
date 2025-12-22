package com.his.system.record;

import com.his.system.record.MedicalRecord;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MedicalRecordRequest {

    private Long visitId;
    private String subjective;
    private String objective;
    private String assessment;
    private String plan;
    private String diagnosis;
    private String icdCode;

    // 🔥 이게 바로 toEntity()
    public MedicalRecord toEntity() {
        return MedicalRecord.builder()
                .subjective(subjective)
                .objective(objective)
                .assessment(assessment)
                .plan(plan)
                .diagnosisName(diagnosis)
                .icd10Code(icdCode)
                .build();
    }
}
