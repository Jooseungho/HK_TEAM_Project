package com.his.system.patient;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient, Long> {

    Optional<Patient> findByChartNo(String chartNo);

    // 오늘 날짜로 시작하는 chartNo 중 가장 큰 번호 찾기
    Patient findTopByChartNoStartingWithOrderByChartNoDesc(String chartNoPrefix);
}
