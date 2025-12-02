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

    // 바이탈 입력
    public Vital createVital(Long visitId, Long nurseId, Vital vitalData) {

        Visit visit = visitRepository.findById(visitId)
                .orElseThrow(() -> new RuntimeException("내원 정보 없음"));

        Staff nurse = staffRepository.findById(nurseId)
                .orElseThrow(() -> new RuntimeException("간호사 정보 없음"));

        Vital vital = Vital.builder()
                .visit(visit)
                .nurseId(nurseId)
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

    // 내원별 바이탈 목록 조회
    public List<Vital> getVitalsByVisit(Long visitId) {
        return vitalRepository.findAll().stream()
                .filter(v -> v.getVisit().getId().equals(visitId))
                .toList();
    }

    // 바이탈 상세 조회
    public Vital getVital(Long id) {
        return vitalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("바이탈 데이터 없음"));
    }
}
