package com.his.system.prescription;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PrescriptionItemRepository extends JpaRepository<PrescriptionItem, Long> {
	List<PrescriptionItem> findByPrescription_Visit_Id(Long visitId);
}
