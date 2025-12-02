package com.his.system.billing;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/billing")
@RequiredArgsConstructor
public class BillingController {

    private final BillingService billingService;

    // 1. 수납 생성
    @PostMapping("/create")
    public Billing createBilling(@RequestParam Long visitId,
                                 @RequestParam Integer totalAmount) {

        return billingService.createBilling(visitId, totalAmount);
    }

    // 2. 결제 처리
    @PostMapping("/pay")
    public Billing payBilling(@RequestParam Long billingId) {
        return billingService.payBilling(billingId);
    }

    // 3. 단일 조회
    @GetMapping("/{id}")
    public Billing getBilling(@PathVariable Long id) {
        return billingService.getBilling(id);
    }

    // 4. 전체 조회
    @GetMapping("/list")
    public List<Billing> getAllBillings() {
        return billingService.getAllBillings();
    }

    // 5. 내원별 수납 조회
    @GetMapping("/visit/{visitId}")
    public Billing getBillingByVisit(@PathVariable Long visitId) {
        return billingService.getBillingByVisit(visitId);
    }
}
