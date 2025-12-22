package com.his.system.billing;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/billing")
@RequiredArgsConstructor
public class BillingController {

    private final BillingService billingService;

    @PostMapping("/create")
    public Billing createBilling(
            @RequestParam Long visitId,
            @RequestParam Integer totalAmount
    ) {
        return billingService.createBilling(visitId, totalAmount);
    }

    @PostMapping("/pay")
    public Billing payBilling(@RequestParam Long billingId) {
        return billingService.payBilling(billingId);
    }

    @GetMapping("/waiting")
    public List<BillingResponse> getWaiting() {
        return billingService.getWaiting();
    }

    @GetMapping("/completed")
    public List<BillingResponse> getCompleted() {
        return billingService.getCompleted();
    }


}
