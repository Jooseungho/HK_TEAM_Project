package com.his.system.staff;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import jakarta.transaction.Transactional;

import java.util.Optional;

public interface StaffRepository extends JpaRepository<Staff, Long> {

    Optional<Staff> findByEmployeeNo(String employeeNo);

    @Transactional
    @Modifying
    void deleteByEmployeeNo(String employeeNo);
}
