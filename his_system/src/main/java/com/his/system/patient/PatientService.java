package com.his.system.patient;

import com.his.system.patient.dto.PatientListDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;

    // 환자 등록
    public Patient register(Patient patient) {
        patient.setChartNo(generateChartNo());
        return patientRepository.save(patient);
    }

    private String generateChartNo() {
        String today = java.time.LocalDate.now().toString().replace("-", "");
        Patient lastPatient = patientRepository
                .findTopByChartNoStartingWithOrderByChartNoDesc("P" + today);

        int seq = 1;
        if (lastPatient != null) {
            String lastChartNo = lastPatient.getChartNo();
            seq = Integer.parseInt(lastChartNo.split("-")[1]) + 1;
        }

        return "P" + today + "-" + String.format("%03d", seq);
    }

    // 엔티티로 전체 조회
    public List<Patient> findAllEntity() {
        return patientRepository.findAll();
    }

    // DTO로 전체 조회
    public List<PatientListDto> findAllDto() {
        return patientRepository.findAll().stream()
                .map(PatientListDto::new)
                .collect(Collectors.toList());
    }

    public Patient getPatient(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
    }

    public Patient getPatientByChartNo(String chartNo) {
        return patientRepository.findByChartNo(chartNo)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
    }
}
