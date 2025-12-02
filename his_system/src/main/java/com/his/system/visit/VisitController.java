package com.his.system.visit;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.his.system.visit.dto.VisitRequest;

import java.util.List;

@RestController
@RequestMapping("/api/visit")
@RequiredArgsConstructor
public class VisitController {

    private final VisitService visitService;

   
    // 대기 목록 조회
    @GetMapping("/waiting_list")
    public List<Visit> getWaitingList() {
        return visitService.getWaitingList();
    }

    // 환자 호출
    @PostMapping("/call/{visitId}/{doctorId}")
    public Visit callPatient(@PathVariable Long visitId,
                             @PathVariable Long doctorId) {

        return visitService.callPatient(visitId, doctorId);
    }

    // 진료 시작
    @PostMapping("/start/{visitId}")
    public Visit startTreatment(@PathVariable Long visitId) {
        return visitService.startTreatment(visitId);
    }

    // 진료 종료
    @PostMapping("/finish/{visitId}")
    public Visit finishTreatment(@PathVariable Long visitId) {
        return visitService.finishTreatment(visitId);
    }

    // 취소
    @PostMapping("/cancel/{visitId}")
    public Visit cancelVisit(@PathVariable Long visitId) {
        return visitService.cancelVisit(visitId);
    }

    // 상세 조회
    @GetMapping("/{id}")
    public Visit getVisit(@PathVariable Long id) {
        return visitService.getVisit(id);
    }

    // 전체 조회
    @GetMapping("/list")
    public List<Visit> getAllVisits() {
        return visitService.getAllVisits();
    }
    
    @PostMapping("/register")
    public Visit registerVisit(@RequestBody VisitRequest request) {
        return visitService.registerVisit(request);
    }

}
