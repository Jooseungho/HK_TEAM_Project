package com.his.system.record;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/record")
@RequiredArgsConstructor
public class MedicalRecordController {

    private final MedicalRecordService medicalRecordService;

    // SOAP 기록 생성
    @PostMapping("/create")
    public MedicalRecord createRecord(@RequestParam Long visitId,
                                      @RequestParam Long doctorId,
                                      @RequestBody MedicalRecord data) {

        return medicalRecordService.createRecord(visitId, doctorId, data);
    }

    // 내원별 기록 목록 조회
    @GetMapping("/visit/{visitId}")
    public List<MedicalRecord> getRecordsByVisit(@PathVariable Long visitId) {
        return medicalRecordService.getRecordsByVisit(visitId);
    }

    // 의사별 기록 목록 조회
    @GetMapping("/doctor/{doctorId}")
    public List<MedicalRecord> getRecordsByDoctor(@PathVariable Long doctorId) {
        return medicalRecordService.getRecordsByDoctor(doctorId);
    }

    // 기록 상세 조회
    @GetMapping("/{id}")
    public MedicalRecord getRecord(@PathVariable Long id) {
        return medicalRecordService.getRecord(id);
    }
}
