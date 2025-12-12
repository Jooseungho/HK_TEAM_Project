package com.his.system.record;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, Long> {

    List<MedicalRecord> findByVisitId(Long visitId);

    List<MedicalRecord> findByDoctorEmployeeNo(String employeeNo);

    List<MedicalRecord> findByVisitPatientId(Long patientId);
}
