package com.his.system.document.request;

import com.his.system.document.DocumentType;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class DocumentRequestDTO {

    private Long requestId;
    private Long visitId;

    private String patientName;
    private String chartNo;

    private DocumentType docType;   // ✅ ENUM으로 변경
    private LocalDateTime requestedAt;
}
