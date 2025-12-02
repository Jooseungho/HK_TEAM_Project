package com.his.system.prescription;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/prescription")
@RequiredArgsConstructor
public class PrescriptionController {

    private final PrescriptionService prescriptionService;
    private final PrescriptionItemService itemService;

    // 1. 처방 생성
    @PostMapping("/create")
    public Prescription createPrescription(@RequestParam Long visitId,
                                           @RequestParam Long doctorId,
                                           @RequestParam(required = false) String note) {

        return prescriptionService.createPrescription(visitId, doctorId, note);
    }

    // 2. 처방 항목 추가
    @PostMapping("/add_item")
    public PrescriptionItem addItem(@RequestParam Long prescriptionId,
                                    @RequestBody PrescriptionItem item) {

        return itemService.addItem(prescriptionId, item);
    }

    // 3. 처방 상세 조회
    @GetMapping("/{id}")
    public Prescription getPrescription(@PathVariable Long id) {
        return prescriptionService.getPrescription(id);
    }
}
