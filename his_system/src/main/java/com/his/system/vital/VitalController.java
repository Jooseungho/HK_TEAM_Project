package com.his.system.vital;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vital")
@RequiredArgsConstructor
public class VitalController {

    private final VitalService vitalService;

    // 바이탈 입력
    @PostMapping("/create")
    public Vital createVital(@RequestParam Long visitId,
                             @RequestParam String nurseId,
                             @RequestBody Vital vitalData) {

    	System.out.println("nurseId"+nurseId);
    	
        return vitalService.createVital(visitId, nurseId, vitalData);
    }

    // 내원별 바이탈 목록 조회
    @GetMapping("/list/{visitId}")
    public List<Vital> getVitals(@PathVariable Long visitId) {
        return vitalService.getVitalsByVisit(visitId);
    }

    // 바이탈 상세 조회
    @GetMapping("/{id}")
    public Vital getVital(@PathVariable Long id) {
        return vitalService.getVital(id);
    }
}
