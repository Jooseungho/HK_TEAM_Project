package com.his.system.prescription;

import com.his.system.visit.Visit;
import com.his.system.visit.VisitRepository;
import com.his.system.staff.Staff;
import com.his.system.staff.StaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;
    private final VisitRepository visitRepository;
    private final StaffRepository staffRepository;

    // 1. 처방 묶음 생성
    public Prescription createPrescription(Long visitId, Long doctorId, String note) {

        Visit visit = visitRepository.findById(visitId)
                .orElseThrow(() -> new RuntimeException("내원 정보 없음"));

        Staff doctor = staffRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("의사 정보 없음"));

        Prescription prescription = Prescription.builder()
                .visit(visit)
                .doctor(doctor)
                .status(PrescriptionStatus.ORDERED)
                .note(note)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return prescriptionRepository.save(prescription);
    }

    // 2. 처방 상세 조회
    public Prescription getPrescription(Long id) {
        return prescriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("처방 없음"));
    }
}
