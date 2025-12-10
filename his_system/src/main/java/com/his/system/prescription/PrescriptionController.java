package com.his.system.prescription;

import com.his.system.prescription.dto.PrescriptionRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/prescription")
@RequiredArgsConstructor
public class PrescriptionController {

    private final PrescriptionService prescriptionService;

    // ✔ 전체 처방 저장
    @PostMapping("/create")
    public Prescription createPrescription(
            @RequestParam Long visitId,
            @RequestParam Long doctorId,
            @RequestBody PrescriptionRequest req
    ) {
        return prescriptionService.createPrescription(visitId, doctorId, req);
    }

    // ✔ 단건 조회
    @GetMapping("/{id}")
    public Prescription getPrescription(@PathVariable Long id) {
        return prescriptionService.getPrescription(id);
    }
}
