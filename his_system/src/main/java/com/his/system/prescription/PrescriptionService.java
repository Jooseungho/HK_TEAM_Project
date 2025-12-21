package com.his.system.prescription;

import com.his.system.prescription.dto.*;
import com.his.system.nurse.NurseTaskService;
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
    private final PrescriptionItemRepository itemRepository;
    private final VisitRepository visitRepository;
    private final StaffRepository staffRepository;
    private final NurseTaskService nurseTaskService;

    public Prescription createPrescription(Long visitId, String employeeNo, PrescriptionRequest req) {

        Visit visit = visitRepository.findById(visitId)
                .orElseThrow(() -> new RuntimeException("내원 정보 없음"));

        Staff doctor = staffRepository.findById(Long.parseLong(employeeNo))
                .orElseThrow(() -> new RuntimeException("의사 정보 없음"));

        // 1. Prescription 생성
        Prescription prescription = Prescription.builder()
                .visit(visit)
                .doctor(doctor)
                .status(PrescriptionStatus.ORDERED)
                .note(req.getNote())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        prescriptionRepository.save(prescription);

        // ⭐ 항목 저장
        // 2-1. 약물 저장
        if (req.getDrugs() != null) {
            for (DrugRequest d : req.getDrugs()) {

                PrescriptionItem item = PrescriptionItem.builder()
                        .prescription(prescription)
                        .itemType(PrescriptionItemType.DRUG)
                        .itemName(d.getName())
                        .dosage(d.getDosage())
                        .frequency(d.getDoseCount())
                        .duration(String.valueOf(d.getDoseDays()))
                        .note(null)
                        .build();

                itemRepository.save(item);
                nurseTaskService.createTask(prescription, item);
            }
        }

        // 2-2. 처치 저장
        if (req.getTreatments() != null) {
            for (TreatmentRequest t : req.getTreatments()) {

                PrescriptionItem item = PrescriptionItem.builder()
                        .prescription(prescription)
                        .itemType(PrescriptionItemType.PROCEDURE)
                        .itemName(t.getName())
                        .note(t.getMemo())
                        .build();

                itemRepository.save(item);
                nurseTaskService.createTask(prescription, item);
            }
        }

        return prescription;
    }
    public Prescription getPrescription(Long id) {
        return prescriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("처방을 찾을 수 없습니다."));
    }

}
