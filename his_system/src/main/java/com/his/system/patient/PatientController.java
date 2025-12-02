package com.his.system.patient;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patient")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;

    // 환자 등록
    @PostMapping("/register")
    public Patient registerPatient(@RequestBody Patient patient) {
        return patientService.register(patient);
    }

    // 전체 조회
    @GetMapping("/list")
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }

    // 환자 상세 조회
    @GetMapping("/{id}")
    public Patient getPatient(@PathVariable Long id) {
        return patientService.getPatient(id);
    }

    // 차트번호로 조회
    @GetMapping("/chart_no/{chartNo}")
    public Patient getPatientByChartNo(@PathVariable String chartNo) {
        return patientService.getPatientByChartNo(chartNo);
    }
}

