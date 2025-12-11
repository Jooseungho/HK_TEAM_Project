package com.his.system.nurse;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NurseTaskDTO {

    private Long id;
    private Long patientId;
    private Long visitId;

    private String itemType;   // DRUG or PROCEDURE
    private String itemName;

    private String status;

    private LocalDateTime createdAt;
    private LocalDateTime doneAt;

}
