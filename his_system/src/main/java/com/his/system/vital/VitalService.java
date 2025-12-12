package com.his.system.vital;

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
public class VitalService {

    private final VitalRepository vitalRepository;
    private final VisitRepository visitRepository;
    private final StaffRepository staffRepository;

    // 🟦 바이탈 입력
    public Vital createVital(Long visitId, String employeeNo, Vital vitalData) {

        Visit visit = visitRepository.findById(visitId)
                .orElseThrow(() -> new RuntimeException("내원 정보 없음"));

        Staff nurseId = staffRepository.findById(employeeNo)
                .orElseThrow(() -> new RuntimeException("간호사 정보 없음"));

        Vital vital = Vital.builder()
                .visit(visit)
                .nurseId(employeeNo)
                .bpSystolic(vitalData.getBpSystolic())
                .bpDiastolic(vitalData.getBpDiastolic())
                .heartRate(vitalData.getHeartRate())
                .temperature(vitalData.getTemperature())
                .respiration(vitalData.getRespiration())
                .spo2(vitalData.getSpo2())
                .memo(vitalData.getMemo())
                .measuredAt(LocalDateTime.now())
                .build();

        return vitalRepository.save(vital);
    }

    // 🟦 방문별 모든 Vital 목록
    public List<Vital> getVitalsByVisit(Long visitId) {
        return vitalRepository.findAllByVisitIdOrderByMeasuredAtDesc(visitId);
    }

    // 🟦 단일 Vital 조회
    public Vital getVital(Long id) {
        return vitalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("바이탈 데이터 없음"));
    }

    // 🟦 최신 Vital 조회 (가장 중요)
    public Vital getLatestByVisit(Long visitId) {
        return vitalRepository.findTopByVisitIdOrderByMeasuredAtDesc(visitId);
    }
}
