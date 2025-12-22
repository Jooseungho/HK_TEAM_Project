package com.his.system.billing;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BillingResponse {

    private Long billingId;
    private Long visitId;

    private Long patientId;
    private String patientName;
    private String chartNo;

    private int totalAmount;
}
