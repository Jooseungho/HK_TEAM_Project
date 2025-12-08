package com.his.system.visit;

import com.his.system.patient.Patient;
import com.his.system.visit.dto.VisitRequest;
import com.his.system.vital.Vital;
import com.his.system.vital.VitalService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/visit")
@RequiredArgsConstructor
public class VisitController {

    private final VisitService visitService;
    private final VitalService vitalService;

    // 🟦 접수 등록
    @PostMapping("/register")
    public Visit registerVisit(@RequestBody VisitRequest request) {
        return visitService.registerVisit(request);
    }

    // 🟦 대기 환자 리스트 (Visit + Patient + 최신 Vital 포함)
    @GetMapping("/waiting_list")
    public List<Map<String, Object>> getWaitingList() {

        List<Visit> list = visitService.getWaitingList();
        List<Map<String, Object>> result = new ArrayList<>();

        for (Visit v : list) {

            Map<String, Object> map = new HashMap<>();
            map.put("id", v.getId());
            map.put("arrivalTime", v.getArrivalTime());
            map.put("patient", v.getPatient());

            // ⭐ 최신 vital 포함
            Vital latestVital = vitalService.getLatestByVisit(v.getId());
            map.put("vital", latestVital);

            result.add(map);
        }

        return result;
    }

    // 🟦 환자 호출 → Visit 상태 변경 + doctor 저장
    @PostMapping("/call/{visitId}/{doctorId}")
    public Visit callPatient(
            @PathVariable Long visitId,
            @PathVariable Long doctorId
    ) {
        return visitService.callPatient(visitId, doctorId);
    }

    // 🟦 진료 시작
    @PostMapping("/{visitId}/start")
    public Visit start(@PathVariable Long visitId) {
        return visitService.startTreatment(visitId);
    }

    // 🟦 진료 완료
    @PostMapping("/{visitId}/complete")
    public Visit complete(@PathVariable Long visitId) {
        return visitService.completeVisit(visitId);
    }

    // 🟦 상세 보기 (Visit + Patient + 최신 Vital)
    @GetMapping("/{visitId}/detail")
    public Map<String, Object> detail(@PathVariable Long visitId) {

        Visit visit = visitService.getVisit(visitId);
        Patient patient = visit.getPatient();
        Vital vital = vitalService.getLatestByVisit(visitId);

        Map<String, Object> map = new HashMap<>();
        map.put("visit", visit);
        map.put("patient", patient);
        map.put("vital", vital);

        return map;
    }
}
