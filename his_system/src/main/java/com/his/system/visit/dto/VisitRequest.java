package com.his.system.visit.dto;

import lombok.Data;

@Data
public class VisitRequest {
    private Long patientId;
    private String nurseId;
    private Integer bpSystolic;
    private Integer bpDiastolic;
    private Integer heartRate;
    private Double temperature;
    private Integer respiration;
    private Integer spo2;
    private String memo;
}
