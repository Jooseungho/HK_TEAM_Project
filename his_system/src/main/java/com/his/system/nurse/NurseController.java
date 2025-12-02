package com.his.system.nurse;

import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

import com.his.system.patient.Patient;
import com.his.system.patient.PatientService;

import com.his.system.visit.Visit;
import com.his.system.visit.VisitService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/nurse")
public class NurseController {

    private final PatientService patientService;
    private final VisitService visitService;

    // 환자 등록
    @PostMapping("/patient/register")
    public Patient registerPatient(@RequestBody Patient patient) {
        return patientService.register(patient);
    }

    // 방문(내원) 등록
    @PostMapping("/visit/register/{patientId}")
    public Visit registerVisit(@PathVariable Long patientId) {
        return visitService.registerVisit(patientId);
    }
}
