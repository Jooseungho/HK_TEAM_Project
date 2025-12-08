package com.his.system.patient;

import com.his.system.patient.dto.PatientListDto;
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

    // 전체 조회 (엔티티)
    @GetMapping("/list")
    public List<Patient> getAllPatients() {
        return patientService.findAllEntity();
    }

    // 전체 조회 (DTO)
    @GetMapping("/list/dto")
    public List<PatientListDto> getAllPatientsDto() {
        return patientService.findAllDto();
    }

    // 상세조회
    @GetMapping("/{id}")
    public Patient getPatient(@PathVariable Long id) {
        return patientService.getPatient(id);
    }

    // 차트번호 조회
    @GetMapping("/chart/{chartNo}")
    public Patient getPatientByChartNo(@PathVariable String chartNo) {
        return patientService.getPatientByChartNo(chartNo);
    }
}
