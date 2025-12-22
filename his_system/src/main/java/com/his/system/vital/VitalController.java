package com.his.system.vital;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vital")
@RequiredArgsConstructor
public class VitalController {

    private final VitalService vitalService;

    // 🟦 Vital 생성
    @PostMapping("/create")
    public Vital createVital(@RequestBody VitalCreateRequest request) {
        return vitalService.createVital(request);
    }

    // 🟦 방문별 Vital 목록
    @GetMapping("/list/{visitId}")
    public List<Vital> getVitals(@PathVariable Long visitId) {
        return vitalService.getVitalsByVisit(visitId);
    }

    // 🟦 Vital 단건 조회
    @GetMapping("/{id}")
    public Vital getVital(@PathVariable Long id) {
        return vitalService.getVital(id);
    }

    // 🟦 최신 Vital
    @GetMapping("/latest/{visitId}")
    public Vital getLatestVital(@PathVariable Long visitId) {
        return vitalService.getLatestByVisit(visitId);
    }
}
