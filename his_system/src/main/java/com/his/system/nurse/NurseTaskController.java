package com.his.system.nurse;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nurse/task")
@RequiredArgsConstructor
public class NurseTaskController {

    private final NurseTaskService nurseTaskService;
    private final NurseTaskRepository repository;

    // 대기 중 처치 조회
    @GetMapping("/pending")
    public List<NurseTask> getPendingTasks() {
        return repository.findByStatus(NurseTaskStatus.PENDING);
    }

    // 완료된 처치 조회
    @GetMapping("/done")
    public List<NurseTask> getDoneTasks() {
        return repository.findByStatus(NurseTaskStatus.DONE);
    }

    // 완료 처리
    @PostMapping("/{id}/complete")
    public NurseTask complete(@PathVariable Long id) {
        return nurseTaskService.completeTask(id);
    }
}
