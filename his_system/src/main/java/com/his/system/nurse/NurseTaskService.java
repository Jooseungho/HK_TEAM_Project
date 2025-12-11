package com.his.system.nurse;

import com.his.system.prescription.Prescription;
import com.his.system.prescription.PrescriptionItem;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class NurseTaskService {

    private final NurseTaskRepository nurseTaskRepository;

    // 처방 항목을 간호사 작업으로 생성
    public void createTask(Prescription prescription, PrescriptionItem item) {

        NurseTask task = NurseTask.builder()
                .prescription(prescription)
                .item(item)
                .patientId(prescription.getVisit().getPatient().getId())
                .visitId(prescription.getVisit().getId())
                .itemType(item.getItemType())
                .itemName(item.getItemName())
                .status(NurseTaskStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .build();

        nurseTaskRepository.save(task);
    }

    // 완료 처리
    public NurseTask completeTask(Long taskId) {
        NurseTask task = nurseTaskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setStatus(NurseTaskStatus.DONE);
        task.setDoneAt(LocalDateTime.now());

        return nurseTaskRepository.save(task);
    }
}
