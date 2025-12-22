package com.his.system.vital;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VitalCreateRequest {

    private Long visitId;
    private String nurseEmployeeNo;

    private Integer bpSystolic;
    private Integer bpDiastolic;
    private Integer heartRate;
    private Double temperature;
    private Integer respiration;
    private Integer spo2;
    private String memo;
}