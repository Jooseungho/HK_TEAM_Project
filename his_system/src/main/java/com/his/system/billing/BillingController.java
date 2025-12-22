package com.his.system.billing;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/billing")
@RequiredArgsConstructor
public class BillingController {

    private final BillingService billingService;

    /** 🔵 수납 대기 목록 */
    @GetMapping("/waiting")
    public List<BillingResponse> waitingList() {
        return billingService.findBillingWaitingList();
    }

    /** 🔵 결제 완료 처리 */
    @PostMapping("/{billingId}/complete")
    public Billing completeBilling(@PathVariable Long billingId) {
        return billingService.completeBilling(billingId);
    }

    /** 🔵 수납 완료 목록 */
    @GetMapping("/completed")
    public List<BillingResponse> completedList() {
        return billingService.findBillingCompletedList();
    }

    /** 🆕 수납 상세 내역 조회 */
    @GetMapping("/{visitId}/items")
    public List<BillingItemResponse> billingItems(@PathVariable Long visitId) {
        return billingService.getBillingItems(visitId);
    }
}
