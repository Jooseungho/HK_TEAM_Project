package com.his.system.drug;

import com.his.system.staff.Staff;
import com.his.system.staff.StaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DrugService {

    private final DrugRepository drugRepository;
    private final DrugLogRepository drugLogRepository;
    private final StaffRepository staffRepository;

    // 약품 등록
    public Drug createDrug(Drug drug) {
        drug.setCreatedAt(LocalDateTime.now());
        drug.setUpdatedAt(LocalDateTime.now());
        return drugRepository.save(drug);
    }

    // 약품 전체 조회
    public List<Drug> getAllDrugs() {
        return drugRepository.findAll();
    }

    // 약품 상세 조회
    public Drug getDrug(Long id) {
        return drugRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("약품을 찾을 수 없습니다."));
    }

    // 재고 증가 (IN)
    public Drug increaseStock(Long drugId, String employeeNo, int quantity, String memo) {

        Drug drug = getDrug(drugId);
        Staff staff = staffRepository.findByEmployeeNo(employeeNo)
                .orElseThrow(() -> new RuntimeException("직원 정보 없음"));

        drug.setStockQuantity(drug.getStockQuantity() + quantity);
        drug.setUpdatedAt(LocalDateTime.now());
        drugRepository.save(drug);

        // 로그 기록
        DrugLog log = DrugLog.builder()
                .drug(drug)
                .staff(staff)
                .changeType(ChangeType.IN)
                .quantity(quantity)
                .memo(memo)
                .createdAt(LocalDateTime.now())
                .build();

        drugLogRepository.save(log);

        return drug;
    }

    // 재고 감소 (OUT)
    public Drug decreaseStock(Long drugId, String employeeNo, int quantity, String memo) {

        Drug drug = getDrug(drugId);
        Staff staff = staffRepository.findByEmployeeNo(employeeNo)
                .orElseThrow(() -> new RuntimeException("직원 정보 없음"));

        if (drug.getStockQuantity() < quantity) {
            throw new RuntimeException("재고 부족");
        }

        drug.setStockQuantity(drug.getStockQuantity() - quantity);
        drug.setUpdatedAt(LocalDateTime.now());
        drugRepository.save(drug);

        // 로그 기록
        DrugLog log = DrugLog.builder()
                .drug(drug)
                .staff(staff)
                .changeType(ChangeType.OUT)
                .quantity(quantity)
                .memo(memo)
                .createdAt(LocalDateTime.now())
                .build();

        drugLogRepository.save(log);

        return drug;
    }
}