package com.his.system.visit;

import com.his.system.patient.Patient;
import com.his.system.patient.PatientRepository;
import com.his.system.visit.dto.VisitRequest;
import com.his.system.vital.Vital;
import com.his.system.vital.VitalService;
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

    // 🔥 새로 추가
    private final VitalService vitalService;

    // 접수 등록 (Visit + Vital 함께 저장)
    @Transactional
    public Visit registerVisit(VisitRequest request) {

        // 1) 환자 찾기
        Patient p = patientRepo.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException("환자 없음"));

        // 2) VISIT 생성 & 저장
        Visit v = Visit.builder()
                .patient(p)
                .doctorId(null)
                .status(VisitStatus.WAITING)
                .arrivalTime(LocalDateTime.now())
                .build();

        v = visitRepo.save(v);   // ID 확보

        // 3) VITAL 생성 & 저장 (VitalService 재사용)
        Vital vitalData = Vital.builder()
                .bpSystolic(request.getBpSystolic())
                .bpDiastolic(request.getBpDiastolic())
                .heartRate(request.getHeartRate())
                .temperature(request.getTemperature())
                .respiration(request.getRespiration())
                .spo2(request.getSpo2())
                .memo(request.getMemo())
                .build();

        // nurseId 검증까지 VitalService.createVital 안에서 처리됨
        vitalService.createVital(v.getId(), request.getNurseId(), vitalData);

        // 4) 프론트에는 Visit 정보만 그대로 리턴
        return v;
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
