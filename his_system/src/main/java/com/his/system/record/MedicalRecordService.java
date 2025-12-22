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

    public MedicalRecord createRecord(
            MedicalRecordRequest req,
            String employeeNo
    ) {
        Visit visit = visitRepository.findById(req.getVisitId())
                .orElseThrow(() -> new RuntimeException("visit 없음"));

        Staff doctor = staffRepository.findByEmployeeNo(employeeNo)
                .orElseThrow(() -> new RuntimeException("doctor 없음"));

        MedicalRecord record = req.toEntity();
        record.setVisit(visit);
        record.setDoctor(doctor);
        record.setCreatedAt(LocalDateTime.now());
        record.setUpdatedAt(LocalDateTime.now());

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
