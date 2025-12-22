package com.his.system.prescription;

import com.his.system.prescription.dto.PrescriptionRequest;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/prescription")
@RequiredArgsConstructor
public class PrescriptionController {

    private final PrescriptionService prescriptionService;

    @PostMapping("/create")
    public ResponseEntity<?> createPrescription(
            @RequestParam Long visitId,
            @RequestBody PrescriptionRequest req
    ) {
        String doctorEmployeeNo =
                org.springframework.security.core.context.SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        prescriptionService.createPrescription(
                visitId,
                doctorEmployeeNo,
                req
        );

        return ResponseEntity.ok("success");
    }


    // ✔ 단건 조회
    @GetMapping("/{id}")
    public Prescription getPrescription(@PathVariable Long id) {
        return prescriptionService.getPrescription(id);
    }
}