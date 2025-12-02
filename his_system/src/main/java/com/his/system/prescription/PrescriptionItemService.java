package com.his.system.prescription;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PrescriptionItemService {

    private final PrescriptionItemRepository itemRepository;
    private final PrescriptionRepository prescriptionRepository;

    // 처방 항목 추가
    public PrescriptionItem addItem(Long prescriptionId, PrescriptionItem data) {

        Prescription prescription = prescriptionRepository.findById(prescriptionId)
                .orElseThrow(() -> new RuntimeException("처방 없음"));

        PrescriptionItem item = PrescriptionItem.builder()
                .prescription(prescription)
                .itemType(data.getItemType())
                .itemName(data.getItemName())
                .dosage(data.getDosage())
                .frequency(data.getFrequency())
                .duration(data.getDuration())
                .note(data.getNote())
                .build();

        return itemRepository.save(item);
    }
}
