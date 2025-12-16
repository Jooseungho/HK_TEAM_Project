package com.his.system.visit;

import com.his.system.patient.Patient;
import com.his.system.patient.PatientRepository;
import com.his.system.staff.Staff;
import com.his.system.staff.StaffRepository;
import com.his.system.visit.dto.VisitRequest;
import com.his.system.vital.Vital;
import com.his.system.vital.VitalService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VisitService {

    private final VisitRepository visitRepo;
    private final PatientRepository patientRepo;
    private final StaffRepository staffRepository;
    private final VitalService vitalService;

    // 🟦 진료중 목록
    public List<Visit> getInTreatmentList() {
        return visitRepo.findByStatus(VisitStatus.IN_TREATMENT);
    }

    // 🟦 접수 등록 (Visit + Vital)
    @Transactional
    public Visit registerVisit(
            VisitRequest request,
            String employeeNo
    ) {
        Patient p = patientRepo.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException("환자 없음"));

        Visit v = visitRepo.save(
                Visit.builder()
                        .patient(p)
                        .status(VisitStatus.WAITING)
                        .arrivalTime(LocalDateTime.now())
                        .build()
        );

        Vital vitalData = Vital.builder()
                .bpSystolic(request.getBpSystolic())
                .bpDiastolic(request.getBpDiastolic())
                .temperature(request.getTemperature())
                .memo(request.getMemo())
                .build();

        // 세션에서 받은 employeeNo 사용
        vitalService.createVital(v.getId(), employeeNo, vitalData);

        return v;
    }

    // 🟦 대기 목록 (WAITING + CALLED)
    public List<Visit> getWaitingList() {
        return visitRepo.findByStatusIn(
                List.of(VisitStatus.WAITING, VisitStatus.CALLED)
        );
    }

    // 🟦 환자 호출
    public Visit callPatient(Long visitId, String doctorEmployeeNo) {

        Visit v = getVisit(visitId);

        Staff doctor = staffRepository.findByEmployeeNo(doctorEmployeeNo)
                .orElseThrow(() -> new RuntimeException("의사 없음"));

        v.setDoctor(doctor);
        v.setStatus(VisitStatus.CALLED);
        v.setCallTime(LocalDateTime.now());

        return visitRepo.save(v);
    }

    // 🟦 진료 시작
    public Visit startTreatment(Long visitId) {
        Visit v = getVisit(visitId);
        v.setStatus(VisitStatus.IN_TREATMENT);
        v.setStartTime(LocalDateTime.now());
        return visitRepo.save(v);
    }

    // 🟦 진료 완료
    public Visit completeVisit(Long visitId) {
        Visit v = getVisit(visitId);
        v.setStatus(VisitStatus.DONE);
        v.setEndTime(LocalDateTime.now());
        return visitRepo.save(v);
    }

    // 🟦 단일 조회
    public Visit getVisit(Long id) {
        return visitRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("visit 없음"));
    }

    // 🟦 전체 조회
    public List<Visit> getAllVisits() {
        return visitRepo.findAll();
    }
}
