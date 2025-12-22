package com.his.system.record;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/record")
@RequiredArgsConstructor
public class MedicalRecordController {

    private final MedicalRecordService medicalRecordService;

    // 환자별 기록 조회
    @GetMapping("/patient/{patientId}")
    public List<MedicalRecord> getRecordsByPatient(@PathVariable Long patientId) {
        return medicalRecordService.getRecordsByPatient(patientId);
    }

    // 내원별 기록 조회
    @GetMapping("/visit/{visitId}")
    public List<MedicalRecord> getRecordsByVisit(@PathVariable Long visitId) {
        return medicalRecordService.getRecordsByVisit(visitId);
    }

    @GetMapping("/doctor/{employeeNo}")
    public List<MedicalRecord> getRecordsByDoctor(@PathVariable String employeeNo) {
        return medicalRecordService.getRecordsByDoctor(employeeNo);
    }


    @PostMapping("/save")
    public MedicalRecord saveRecord(
            @RequestBody MedicalRecordRequest req
    ) {
        String employeeNo = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return medicalRecordService.createRecord(req, employeeNo);
    }

    // 기록 상세 조회
    @GetMapping("/{id}")
    public MedicalRecord getRecord(@PathVariable Long id) {
        return medicalRecordService.getRecord(id);
    }
}