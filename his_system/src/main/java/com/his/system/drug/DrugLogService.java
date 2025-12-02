package com.his.system.drug;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DrugLogService {

    private final DrugLogRepository drugLogRepository;

    public List<DrugLog> getLogs(Long drugId) {
        return drugLogRepository.findAll().stream()
                .filter(log -> log.getDrug().getId().equals(drugId))
                .toList();
    }
}
