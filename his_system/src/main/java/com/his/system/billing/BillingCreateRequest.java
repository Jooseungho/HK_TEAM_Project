package com.his.system.billing;

import java.util.List;

public record BillingCreateRequest(
        Long visitId,
        List<Long> treatmentIds,
        List<Long> drugIds
) {}
