package com.his.system.patient;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;

    // 환자 등록
    public Patient register(Patient patient) {

        // 1. 차트번호 자동 생성
        patient.setChartNo(generateChartNo());

        return patientRepository.save(patient);
    }

    // ============================
    //  차트번호 자동 생성 로직
    // ============================
    private String generateChartNo() {

        String today = java.time.LocalDate.now().toString().replace("-", ""); 
        // ex: "20251202"

        // 오늘 날짜로 시작하는 마지막 환자 검색
        Patient lastPatient = patientRepository.findTopByChartNoStartingWithOrderByChartNoDesc("P" + today);

        int seq = 1;

        if (lastPatient != null) {
            // 기존 마지막 번호 → seq 추출
            String lastChartNo = lastPatient.getChartNo(); // P20251202-003
            String[] parts = lastChartNo.split("-");

            seq = Integer.parseInt(parts[1]) + 1;
        }

        // 3자리 포맷: 001, 002 …
        String seqStr = String.format("%03d", seq);

        return "P" + today + "-" + seqStr;
    }

    // 전체 조회
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    // 환자 상세 조회
    public Patient getPatient(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
    }

    // 차트번호 조회
    public Patient getPatientByChartNo(String chartNo) {
        return patientRepository.findByChartNo(chartNo)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
    }
}
