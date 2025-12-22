package com.his.system.document;

import com.his.system.document.request.DocumentRequest;
import com.his.system.document.request.DocumentRequestRepository;
import com.his.system.document.request.DocumentRequestStatus;
import com.his.system.staff.Staff;
import com.his.system.staff.StaffRepository;
import com.his.system.visit.Visit;
import com.his.system.visit.VisitRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientDocumentService {

    private final PatientDocumentRepository documentRepository;
    private final VisitRepository visitRepository;
    private final StaffRepository staffRepository;
    private final DocumentRequestRepository documentRequestRepository;

    
    @Transactional
    public PatientDocument createDocument(
            Long visitId,
            String employeeNo,
            DocumentType docType,
            String htmlContent
    ) {
        // 1. visit
        Visit visit = visitRepository.findById(visitId)
                .orElseThrow(() -> new RuntimeException("내원 정보 없음"));

        // 2. 의사
        Staff doctor = staffRepository.findByEmployeeNo(employeeNo)
                .orElseThrow(() -> new RuntimeException("직원 정보 없음"));

        // 3. 문서 생성
        PatientDocument doc = PatientDocument.builder()
                .visit(visit)
                .createdBy(doctor)
                .docType(docType)
                .contentHtml(htmlContent)
                .createdAt(LocalDateTime.now())
                .build();

        PatientDocument saved = documentRepository.save(doc);

        documentRequestRepository
        .findByVisit_IdAndDocTypeAndStatus(
                visitId,
                docType,
                DocumentRequestStatus.REQUESTED
        )
        .ifPresent(req -> {
            req.setStatus(DocumentRequestStatus.SENT);
            documentRequestRepository.save(req);
        });


        return saved;
    }


    
    public PatientDocument getDocument(Long id) {
        return documentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("문서 없음"));
    }

    public List<PatientDocument> getDocumentsByVisit(Long visitId) {
        return documentRepository.findAll().stream()
                .filter(d -> d.getVisit().getId().equals(visitId))
                .toList();
    }

    // ⭐⭐ 이거 추가 ⭐⭐
    public List<PatientDocument> getAllForNurse() {
        return documentRepository.findAll(
                Sort.by(Sort.Direction.DESC, "createdAt")
        );
    }
    
}
