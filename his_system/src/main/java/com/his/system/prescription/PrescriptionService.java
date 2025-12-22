package com.his.system.prescription;

import com.his.system.prescription.dto.*;
import com.his.system.nurse.NurseTaskService;
import com.his.system.visit.Visit;
import com.his.system.visit.VisitRepository;
import com.his.system.staff.Staff;
import com.his.system.staff.StaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;
    private final PrescriptionItemRepository itemRepository;
    private final VisitRepository visitRepository;
    private final StaffRepository staffRepository;
    private final NurseTaskService nurseTaskService;

    /**
     * 처방 생성
     * - 트랜잭션 단위로 처리
     * - 의사/내원/항목/간호사 task까지 한 번에
     */
    @Transactional
    public Prescription createPrescription(
            Long visitId,
            String employeeNo,
            PrescriptionRequest req
    ) {
        // 1️⃣ 내원 정보 조회
        Visit visit = visitRepository.findById(visitId)
                .orElseThrow(() -> new RuntimeException("내원 정보 없음"));

        // 2️⃣ 의사 조회 (JWT 기준)
        Staff doctor = staffRepository.findByEmployeeNo(employeeNo)
                .orElseThrow(() -> new RuntimeException("의사 정보 없음"));

        // 3️⃣ Prescription 생성
        Prescription prescription = Prescription.builder()
                .visit(visit)
                .doctor(doctor)
                .status(PrescriptionStatus.ORDERED)
                .note(req.getNote())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        prescriptionRepository.save(prescription);

        // 4️⃣ 약물 저장
        saveDrugItems(prescription, req.getDrugs());

        // 5️⃣ 처치 저장
        saveTreatmentItems(prescription, req.getTreatments());

        return prescription;
    }

    /**
     * 약물 항목 저장
     */
    private void saveDrugItems(
            Prescription prescription,
            List<DrugRequest> drugs
    ) {
        if (drugs == null || drugs.isEmpty()) return;

        for (DrugRequest d : drugs) {
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

    /**
     * 처치 항목 저장
     */
    private void saveTreatmentItems(
            Prescription prescription,
            List<TreatmentRequest> treatments
    ) {
        if (treatments == null || treatments.isEmpty()) return;

        for (TreatmentRequest t : treatments) {
            PrescriptionItem item = PrescriptionItem.builder()
                    .prescription(prescription)
                    .itemType(
                            "INJECTION".equals(t.getType())
                                    ? PrescriptionItemType.INJECTION
                                    : PrescriptionItemType.PROCEDURE
                    )
                    .itemName(t.getName())
                    .note(t.getMemo())
                    .build();

            itemRepository.save(item);
            nurseTaskService.createTask(prescription, item);
        }
    }

    /**
     * 처방 단건 조회
     */
    public Prescription getPrescription(Long id) {
        return prescriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("처방을 찾을 수 없습니다."));
    }
}
