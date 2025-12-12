package com.his.system.document;

import com.his.system.staff.Staff;
import com.his.system.staff.StaffRepository;
import com.his.system.visit.Visit;
import com.his.system.visit.VisitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientDocumentService {

    private final PatientDocumentRepository documentRepository;
    private final VisitRepository visitRepository;
    private final StaffRepository staffRepository;

    // 문서 생성
    public PatientDocument createDocument(Long visitId, String employeeNo,
                                          DocumentType docType, String htmlContent) {

        Visit visit = visitRepository.findById(visitId)
                .orElseThrow(() -> new RuntimeException("내원 정보 없음"));

        Staff staff = staffRepository.findById(employeeNo)
                .orElseThrow(() -> new RuntimeException("직원 정보 없음"));

        PatientDocument doc = PatientDocument.builder()
                .visit(visit)
                .createdBy(staff)
                .docType(docType)
                .contentHtml(htmlContent)
                .createdAt(LocalDateTime.now())
                .build();

        return documentRepository.save(doc);
    }

    // 문서 상세 조회
    public PatientDocument getDocument(Long id) {
        return documentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("문서를 찾을 수 없습니다."));
    }

    // 내원별 문서 목록 조회
    public List<PatientDocument> getDocumentsByVisit(Long visitId) {
        return documentRepository.findAll().stream()
                .filter(doc -> doc.getVisit().getId().equals(visitId))
                .toList();
    }
}
