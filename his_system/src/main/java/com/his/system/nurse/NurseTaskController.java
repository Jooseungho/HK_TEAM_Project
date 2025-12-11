package com.his.system.nurse;

import com.his.system.nurse.NurseTaskDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nurse/task")
@RequiredArgsConstructor
public class NurseTaskController {

    private final NurseTaskRepository repository;
    private final NurseTaskService nurseTaskService;

    // ⏳ 대기 중 Task 조회 (DTO 반환)
    @GetMapping("/pending")
    public List<NurseTaskDTO> getPendingTasks() {
        return repository.findByStatus(NurseTaskStatus.PENDING)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    // ✅ 완료된 Task 조회 (DTO 반환)
    @GetMapping("/done")
    public List<NurseTaskDTO> getDoneTasks() {
        return repository.findByStatus(NurseTaskStatus.DONE)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    // ✔ 처치 완료 처리
    @PostMapping("/{id}/complete")
    public NurseTaskDTO complete(@PathVariable Long id) {
        NurseTask updated = nurseTaskService.completeTask(id);
        return toDTO(updated);
    }

    // -------------------------------
    // ✔ 엔티티 → DTO 변환 메서드
    // -------------------------------
    private NurseTaskDTO toDTO(NurseTask task) {
        return NurseTaskDTO.builder()
                .id(task.getId())
                .patientId(task.getPatientId())
                .visitId(task.getVisitId())
                .itemType(task.getItemType().name())
                .itemName(task.getItemName())
                .status(task.getStatus().name())
                .createdAt(task.getCreatedAt())
                .doneAt(task.getDoneAt())
                .build();
    }
}
