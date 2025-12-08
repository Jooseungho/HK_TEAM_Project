package com.his.system.visit;

import com.his.system.patient.Patient;
import com.his.system.patient.PatientRepository;
import com.his.system.visit.dto.VisitRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VisitService {

    private final VisitRepository visitRepo;
    private final PatientRepository patientRepo;

    // 접수 등록
    public Visit registerVisit(VisitRequest request) {

        Patient p = patientRepo.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException("환자 없음"));

        Visit v = Visit.builder()
                .patient(p)
                .doctorId(null)
                .status(VisitStatus.WAITING)
                .arrivalTime(LocalDateTime.now())
                .build();

        return visitRepo.save(v);
    }

    // 대기 목록
    public List<Visit> getWaitingList() {
        return visitRepo.findByStatusOrderByArrivalTimeAsc(VisitStatus.WAITING);
    }

    // 환자 호출
    public Visit callPatient(Long visitId, Long doctorId) {
        Visit v = getVisit(visitId);
        v.setDoctorId(doctorId);
        v.setStatus(VisitStatus.CALLED);
        v.setCallTime(LocalDateTime.now());
        return visitRepo.save(v);
    }

    // 진료 시작
    public Visit startTreatment(Long visitId) {
        Visit v = getVisit(visitId);
        v.setStatus(VisitStatus.IN_TREATMENT);
        v.setStartTime(LocalDateTime.now());
        return visitRepo.save(v);
    }

    // 진료 완료
    public Visit completeVisit(Long visitId) {
        Visit v = getVisit(visitId);
        v.setStatus(VisitStatus.DONE);
        v.setEndTime(LocalDateTime.now());
        return visitRepo.save(v);
    }

    // 단일 visit 조회
    public Visit getVisit(Long id) {
        return visitRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("visit 없음"));
    }

    // 전체 조회
    public List<Visit> getAllVisits() {
        return visitRepo.findAll();
    }
}
