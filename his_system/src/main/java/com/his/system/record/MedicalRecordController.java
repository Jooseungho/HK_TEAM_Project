package com.his.system.record;

import com.his.system.record.*;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;

import java.util.List;
@RestController
@RequestMapping("/api/record")
@RequiredArgsConstructor
public class MedicalRecordController {

    private final MedicalRecordService medicalRecordService;

    @PostMapping("/save")
    public MedicalRecord saveRecord(
            @RequestBody MedicalRecordRequest req,
            HttpSession session
    ) {
        String employeeNo =
                (String) session.getAttribute("LOGIN_EMPLOYEE_NO");

        if (employeeNo == null) {
            throw new RuntimeException("로그인 필요");
        }

        return medicalRecordService.createRecord(
                req.getVisitId(),
                employeeNo,
                req
        );
    }

    // 환자별 기록 조회
    @GetMapping("/patient/{patientId}")
    public List<MedicalRecord> getRecordsByPatient(@PathVariable Long patientId) {
        return medicalRecordService.getRecordsByPatient(patientId);
    }

    // 방문별 기록 조회
    @GetMapping("/visit/{visitId}")
    public List<MedicalRecord> getRecordsByVisit(@PathVariable Long visitId) {
        return medicalRecordService.getRecordsByVisit(visitId);
    }
}

