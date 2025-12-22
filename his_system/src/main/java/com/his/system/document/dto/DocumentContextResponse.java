package com.his.system.document.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DocumentContextResponse {

    private Long visitId;

    private Long patientId;
    private String patientName;
    private String chartNo;
    private String birthDate;

    private String doctorId;   // employeeNo
    private String doctorName;
}
