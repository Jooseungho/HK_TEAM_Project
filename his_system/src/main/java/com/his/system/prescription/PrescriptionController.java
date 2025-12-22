package com.his.system.prescription;

import com.his.system.prescription.dto.PrescriptionRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/prescription")
@RequiredArgsConstructor
public class PrescriptionController {

    private final PrescriptionService prescriptionService;

    /**
     * 처방 생성
     * - visitId는 파라미터
     * - 의사(employeeNo)는 JWT(SecurityContext) 기준
     */
    @PostMapping("/create")
    public ResponseEntity<?> createPrescription(
            @RequestParam Long visitId,
            @RequestBody PrescriptionRequest req
    ) {
        String employeeNo = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        prescriptionService.createPrescription(visitId, employeeNo, req);
        return ResponseEntity.ok().build();
    }

    /**
     * 처방 단건 조회
     */
    @GetMapping("/{id}")
    public Prescription getPrescription(@PathVariable Long id) {
        return prescriptionService.getPrescription(id);
    }
}
