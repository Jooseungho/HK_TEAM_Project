package com.his.system.visit;

import com.his.system.patient.Patient;
import com.his.system.visit.dto.VisitRequest;
import com.his.system.vital.Vital;
import com.his.system.vital.VitalService;

import jakarta.servlet.http.HttpSession;
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
    private final VisitRepository visitRepository;

    @PostMapping("/register")
    public Visit registerVisit(
            @RequestBody VisitRequest request,
            HttpSession session
    ) {
        String employeeNo =
            (String) session.getAttribute("LOGIN_EMPLOYEE_NO");

        if (employeeNo == null) {
            throw new RuntimeException("로그인 필요");
        }

        return visitService.registerVisit(request, employeeNo);
    }


    // 🟦 대기 환자 리스트 (Visit + Patient + 최신 Vital 포함)
    @GetMapping("/waiting_list")
    public List<Map<String, Object>> getWaitingList() {

        List<Visit> list = visitService.getWaitingList();
        List<Map<String, Object>> result = new ArrayList<>();

        for (Visit v : list) {

            Map<String, Object> map = new HashMap<>();
            map.put("id", v.getId());
            map.put("status", v.getStatus());          // ✅ 이 줄 추가
            map.put("arrivalTime", v.getArrivalTime());
            map.put("patient", v.getPatient());

            Vital latestVital = vitalService.getLatestByVisit(v.getId());
            map.put("vital", latestVital);

            result.add(map);
        }

        return result;
    }


    
    @GetMapping("/in-treatment")
    public List<Map<String, Object>> getInTreatment() {

        List<Visit> list = visitService.getInTreatmentList();
        List<Map<String, Object>> result = new ArrayList<>();

        for (Visit v : list) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", v.getId());
            map.put("arrivalTime", v.getArrivalTime());
            map.put("status", v.getStatus());          // ✅ 추가
            map.put("startTime", v.getStartTime());    // ✅ 추가
            map.put("patient", v.getPatient());

            Vital vital = vitalService.getLatestByVisit(v.getId());
            map.put("vital", vital);

            result.add(map);
        }

        return result;
    }


    @GetMapping("/status_counts")
    public Map<String, Long> getStatusCounts() {

        Map<String, Long> result = new HashMap<>();

        long waiting = visitRepository.countByStatus(VisitStatus.WAITING);

        long inTreatment = visitRepository.countByStatusIn(
            List.of(VisitStatus.CALLED, VisitStatus.IN_TREATMENT)
        );

        long done = visitRepository.countByStatus(VisitStatus.DONE);

        result.put("WAITING", waiting);
        result.put("IN_TREATMENT", inTreatment);
        result.put("DONE", done);

        return result;
    }


    @PostMapping("/call/{visitId}")
    public Visit callPatient(
        @PathVariable Long visitId,
        HttpSession session
    ) {
        String employeeNo =
            (String) session.getAttribute("LOGIN_EMPLOYEE_NO");

        if (employeeNo == null) {
            throw new RuntimeException("로그인 필요");
        }

        return visitService.callPatient(visitId, employeeNo);
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
