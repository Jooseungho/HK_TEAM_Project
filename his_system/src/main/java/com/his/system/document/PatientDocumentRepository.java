package com.his.system.document;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.his.system.document.request.DocumentRequest;

public interface PatientDocumentRepository extends JpaRepository<PatientDocument, Long> {
	Optional<DocumentRequest>
	findByVisit_IdAndDocType(Long visitId, DocumentType docType);

}
