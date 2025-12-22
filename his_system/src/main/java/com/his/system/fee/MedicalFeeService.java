package com.his.system.fee;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MedicalFeeService {

    private final MedicalFeeRepository feeRepository;

    public int calculateTotal(List<Long> feeIds) {
        return feeRepository.findAllById(feeIds)
                .stream()
                .mapToInt(MedicalFee::getPrice)
                .sum();
    }

    public List<MedicalFee> getAll() {
        return feeRepository.findAll();
    }
}
