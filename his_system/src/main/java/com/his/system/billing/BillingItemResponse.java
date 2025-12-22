package com.his.system.billing;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BillingItemResponse {
    private String itemType;   // DRUG / PROCEDURE / INJECTION
    private String itemName;   // 타이레놀 / X-ray / 비타민 주사
    private int price;         // 금액
}
