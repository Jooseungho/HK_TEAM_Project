package com.his.system.vital;

import com.his.system.visit.Visit;
import com.his.system.visit.VisitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VitalService {

    private final VitalRepository vitalRepository;
    private final VisitRepository visitRepository;

    // 🟦 바이탈 입력
    public Vital createVital(Long visitId, String employeeNo, Vital vitalData) {

        Visit visit = visitRepository.findById(visitId)
                .orElseThrow(() -> new RuntimeException("내원 정보 없음"));

        Vital vital = Vital.builder()
                .visit(visit)
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

    public List<Vital> getVitalsByVisit(Long visitId) {
        return vitalRepository.findAllByVisitIdOrderByMeasuredAtDesc(visitId);
    }

    public Vital getVital(Long id) {
        return vitalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("바이탈 데이터 없음"));
    }

    public Vital getLatestByVisit(Long visitId) {
        return vitalRepository.findTopByVisitIdOrderByMeasuredAtDesc(visitId);
    }
}
