// 🔹 StaffRepository.java
package com.his.system.staff;


import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;


public interface StaffRepository extends JpaRepository<Staff, Long> {
Optional<Staff> findByEmployeeNo(String employeeNo);
}