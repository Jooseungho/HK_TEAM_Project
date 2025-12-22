package com.his.system.document;

import lombok.*;

@Getter
@AllArgsConstructor
public class DocumentContextDTO {

    private Long visitId;

    private Long patientId;
    private String patientName;
    private String chartNo;
    private String birthDate;

    private Long doctorId;
    private String doctorName;
}
