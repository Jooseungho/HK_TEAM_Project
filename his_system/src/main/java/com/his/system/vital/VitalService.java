package com.his.system.vital;

import com.his.system.staff.Staff;
import com.his.system.staff.StaffRepository;
import com.his.system.staff.StaffRole;
import com.his.system.visit.Visit;
import com.his.system.visit.VisitRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VitalService {

    private final VitalRepository vitalRepository;
    private final VisitRepository visitRepository;
    private final StaffRepository staffRepository;

    // 🔥 Vital 생성
    @Transactional
    public Vital createVital(VitalCreateRequest req) {

        // 1️⃣ Visit 확인
        Visit visit = visitRepository.findById(req.getVisitId())
                .orElseThrow(() -> new RuntimeException("visit 없음"));

        // 2️⃣ Nurse 확인
        Staff nurse = staffRepository.findByEmployeeNo(req.getNurseEmployeeNo())
                .orElseThrow(() -> new RuntimeException("간호사 없음"));

        if (nurse.getRole() != StaffRole.NURSE) {
            throw new RuntimeException("간호사만 Vital 입력 가능");
        }

        // 3️⃣ Vital 생성
        Vital vital = Vital.builder()
                .visit(visit)
                .nurseEmployeeNo(req.getNurseEmployeeNo())
                .bpSystolic(req.getBpSystolic())
                .bpDiastolic(req.getBpDiastolic())
                .heartRate(req.getHeartRate())   // ⭐ 핵심
                .temperature(req.getTemperature())
                .respiration(req.getRespiration())
                .spo2(req.getSpo2())
                .memo(req.getMemo())
                .measuredAt(LocalDateTime.now())
                .build();

        return vitalRepository.save(vital);
    }

    // 🟦 방문별 Vital 목록
    public List<Vital> getVitalsByVisit(Long visitId) {
        return vitalRepository.findAllByVisitIdOrderByMeasuredAtDesc(visitId);
    }

    // 🟦 단일 Vital 조회
    public Vital getVital(Long id) {
        return vitalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("바이탈 데이터 없음"));
    }

    // 🟦 최신 Vital
    public Vital getLatestByVisit(Long visitId) {
        return vitalRepository.findTopByVisitIdOrderByMeasuredAtDesc(visitId);
    }
}
