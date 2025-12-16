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
        prescriptionService.createPrescription(visitId, req);
        return ResponseEntity.ok("success");
    }
}
