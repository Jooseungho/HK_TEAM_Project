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

    // SOAP 저장
    public MedicalRecord createRecord(Long visitId, String employeeNo, MedicalRecord data) {

        Visit visit = visitRepository.findById(visitId)
                .orElseThrow(() -> new RuntimeException("visit 없음"));

        Staff doctor = staffRepository.findById(Long.parseLong(employeeNo))
                .orElseThrow(() -> new RuntimeException("doctor 없음"));

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

    // 방문별 조회
    public List<MedicalRecord> getRecordsByVisit(Long visitId) {
        return medicalRecordRepository.findByVisitId(visitId);
    }

 // 의사(employeeNo)별 기록 조회
    public List<MedicalRecord> getRecordsByDoctor(String employeeNo) {
        return medicalRecordRepository.findByDoctorEmployeeNo(employeeNo);
    }


    // 환자별 조회
    public List<MedicalRecord> getRecordsByPatient(Long patientId) {
        return medicalRecordRepository.findByVisitPatientId(patientId);
    }

    // 단일 조회
    public MedicalRecord getRecord(Long id) {
        return medicalRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("기록 없음"));
    }
}
