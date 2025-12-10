package com.his.system.prescription;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PrescriptionItemService {

    private final PrescriptionRepository prescriptionRepository;
    private final PrescriptionItemRepository itemRepository;

    public Prescription addItem(Long prescriptionId, PrescriptionItem itemReq) {

        Prescription prescription = prescriptionRepository.findById(prescriptionId)
                .orElseThrow(() -> new RuntimeException("처방 정보 없음"));

        // 처방 항목 엔티티 생성
        PrescriptionItem item = PrescriptionItem.builder()
                .prescription(prescription)
                .itemType(itemReq.getItemType())
                .itemName(itemReq.getItemName())
                .dosage(itemReq.getDosage())
                .frequency(itemReq.getFrequency())
                .duration(itemReq.getDuration())
                .note(itemReq.getNote())
                .build();

        // 리스트에 추가
        prescription.getItems().add(item);

        return prescriptionRepository.save(prescription);
    }
}

