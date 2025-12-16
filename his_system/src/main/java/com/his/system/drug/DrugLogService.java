package com.his.system.drug;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DrugLogService {

    private final DrugLogRepository drugLogRepository;

    // 🔥 특정 약품 입출고 로그 조회
    public List<DrugLog> getLogs(Long drugId) {
        return drugLogRepository.findByDrugId(drugId);
    }
}
