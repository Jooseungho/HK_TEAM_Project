package com.his.system.drug;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drug")
@RequiredArgsConstructor
public class DrugController {

    private final DrugService drugService;
    private final DrugLogService drugLogService;

    // 🔹 관리자 재고 목록
    @GetMapping("/list")
    public List<Drug> getAllDrugs() {
        return drugService.getAllDrugs();
    }

    // 🔹 약품 등록
    @PostMapping("/create")
    public Drug createDrug(@RequestBody Drug drug) {
        return drugService.createDrug(drug);
    }

    // 🔹 입고
    @PostMapping("/increase")
    public Drug increase(
            @RequestParam Long drugId,
            @RequestParam String employeeNo,
            @RequestParam int quantity,
            @RequestParam(required = false) String memo
    ) {
        return drugService.increaseStock(drugId, employeeNo, quantity, memo);
    }

    // 🔹 출고
    @PostMapping("/decrease")
    public Drug decrease(
            @RequestParam Long drugId,
            @RequestParam String employeeNo,
            @RequestParam int quantity,
            @RequestParam(required = false) String memo
    ) {
        return drugService.decreaseStock(drugId, employeeNo, quantity, memo);
    }
}
