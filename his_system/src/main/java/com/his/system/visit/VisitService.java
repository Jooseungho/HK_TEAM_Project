package com.his.system.visit;

import com.his.system.patient.Patient;
import com.his.system.patient.PatientRepository;
import com.his.system.visit.dto.VisitRequest;
import com.his.system.vital.Vital;
import com.his.system.vital.VitalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VisitService {

    private final VitalRepository vitalRepository;
    private final VisitRepository visitRepository;
    private final PatientRepository patientRepository;


    // ============================
    // 1. 방문(내원) 등록 (Vital 없이 등록)
    // ============================
    public Visit registerVisit(Long patientId) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("환자를 찾을 수 없습니다."));

        Visit visit = new Visit();
        visit.setPatient(patient);
        visit.setStatus(VisitStatus.WAITING);
        visit.setArrivalTime(LocalDateTime.now());

        return visitRepository.save(visit);
    }

    // ============================
    // 2. Vital 포함한 접수 등록 (2-1 과정)
    // ============================
    public Visit registerVisit(VisitRequest req) {

        // 1) 환자 조회
        Patient patient = patientRepository.findById(req.getPatientId())
                .orElseThrow(() -> new RuntimeException("환자를 찾을 수 없습니다."));

        // 2) Visit 생성
        Visit visit = new Visit();
        visit.setPatient(patient);
        visit.setStatus(VisitStatus.WAITING);
        visit.setArrivalTime(LocalDateTime.now());

        // 저장 → visitId 생성됨
        Visit savedVisit = visitRepository.save(visit);

        // 3) Vital 생성 (여기가 핵심)
        Vital vital = new Vital();
        vital.setVisit(savedVisit);
        vital.setNurseId(req.getNurseId());
        vital.setBpSystolic(req.getBpSystolic());
        vital.setBpDiastolic(req.getBpDiastolic());
        vital.setHeartRate(req.getHeartRate());
        vital.setTemperature(req.getTemperature());
        vital.setRespiration(req.getRespiration());
        vital.setSpo2(req.getSpo2());
        vital.setMemo(req.getMemo());
        vital.setMeasuredAt(LocalDateTime.now());

        vitalRepository.save(vital);

        return savedVisit;
    }


    // ============================
    // 3. 대기 환자 조회
    // ============================
    public List<Visit> getWaitingList() {
        return visitRepository.findByStatusOrderByArrivalTimeAsc(VisitStatus.WAITING);
    }

    // ============================
    // 4. 환자 호출
    // ============================
    public Visit callPatient(Long visitId, Long doctorId) {
        Visit visit = visitRepository.findById(visitId)
                .orElseThrow(() -> new RuntimeException("Visit not found"));

        visit.setStatus(VisitStatus.CALLED);
        visit.setDoctorId(doctorId);
        visit.setCallTime(LocalDateTime.now());

        return visitRepository.save(visit);
    }

    // ============================
    // 5. 진료 시작
    // ============================
    public Visit startTreatment(Long visitId) {
        Visit visit = visitRepository.findById(visitId)
                .orElseThrow(() -> new RuntimeException("Visit not found"));

        visit.setStatus(VisitStatus.IN_TREATMENT);
        visit.setStartTime(LocalDateTime.now());

        return visitRepository.save(visit);
    }

    // ============================
    // 6. 진료 종료
    // ============================
    public Visit finishTreatment(Long visitId) {
        Visit visit = visitRepository.findById(visitId)
                .orElseThrow(() -> new RuntimeException("Visit not found"));

        visit.setStatus(VisitStatus.DONE);
        visit.setEndTime(LocalDateTime.now());

        return visitRepository.save(visit);
    }

    // ============================
    // 7. 방문 취소
    // ============================
    public Visit cancelVisit(Long visitId) {
        Visit visit = visitRepository.findById(visitId)
                .orElseThrow(() -> new RuntimeException("Visit not found"));

        visit.setStatus(VisitStatus.CANCELLED);

        return visitRepository.save(visit);
    }

    // ============================
    // 8. 상세 조회
    // ============================
    public Visit getVisit(Long id) {
        return visitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Visit not found"));
    }

    // ============================
    // 9. 전체 조회
    // ============================
    public List<Visit> getAllVisits() {
        return visitRepository.findAll();
    }
}
