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

    // 약품 등록
    @PostMapping("/create")
    public Drug createDrug(@RequestBody Drug drug) {
        return drugService.createDrug(drug);
    }

    // 약품 전체 조회
    @GetMapping("/list")
    public List<Drug> getAllDrugs() {
        return drugService.getAllDrugs();
    }

    // 약품 상세 조회
    @GetMapping("/{id}")
    public Drug getDrug(@PathVariable Long id) {
        return drugService.getDrug(id);
    }

    // 재고 증가 (입고)
    @PostMapping("/increase")
    public Drug increaseStock(@RequestParam Long drugId,
                              @RequestParam String employeeNo,
                              @RequestParam int quantity,
                              @RequestParam(required = false) String memo) {

        return drugService.increaseStock(drugId, employeeNo, quantity, memo);
    }

    // 재고 감소 (출고)
    @PostMapping("/decrease")
    public Drug decreaseStock(@RequestParam Long drugId,
                              @RequestParam String employeeNo,
                              @RequestParam int quantity,
                              @RequestParam(required = false) String memo) {

        return drugService.decreaseStock(drugId, employeeNo, quantity, memo);
    }

    // 특정 약품의 입출고 로그 조회
    @GetMapping("/log/{drugId}")
    public List<DrugLog> getDrugLogs(@PathVariable Long drugId) {
        return drugLogService.getLogs(drugId);
    }
}
