package com.his.system.document.request;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor
public class SentDocumentDTO {

    private Long requestId;
    private String docType;
    private LocalDateTime requestedAt;

    private String patientName;
    private String chartNo;
}
