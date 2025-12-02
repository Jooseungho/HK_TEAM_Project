package com.his.system.record;

import com.his.system.visit.Visit;
import com.his.system.visit.VisitRepository;
import com.his.system.staff.Staff;
import com.his.system.staff.StaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MedicalRecordService {

    private final MedicalRecordRepository medicalRecordRepository;
    private final VisitRepository visitRepository;
    private final StaffRepository staffRepository;

    // SOAP 기록 생성
    public MedicalRecord createRecord(Long visitId, Long doctorId, MedicalRecord data) {

        Visit visit = visitRepository.findById(visitId)
                .orElseThrow(() -> new RuntimeException("내원 정보 없음"));

        Staff doctor = staffRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("의사 정보 없음"));

        MedicalRecord record = MedicalRecord.builder()
                .visit(visit)
                .doctor(doctor)
                .subjective(data.getSubjective())
                .objective(data.getObjective())
                .assessment(data.getAssessment())
                .plan(data.getPlan())
                .diagnosisName(data.getDiagnosisName())
                .icd10Code(data.getIcd10Code())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return medicalRecordRepository.save(record);
    }

    // 내원별 진료 기록 조회 (1:N)
    public List<MedicalRecord> getRecordsByVisit(Long visitId) {
        return medicalRecordRepository.findAll().stream()
                .filter(r -> r.getVisit().getId().equals(visitId))
                .toList();
    }

    // 의사별 전체 기록 조회
    public List<MedicalRecord> getRecordsByDoctor(Long doctorId) {
        return medicalRecordRepository.findAll().stream()
                .filter(r -> r.getDoctor().getId().equals(doctorId))
                .toList();
    }

    // 진료 기록 상세 조회
    public MedicalRecord getRecord(Long id) {
        return medicalRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("기록 없음"));
    }
}
