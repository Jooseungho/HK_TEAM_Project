package com.his.system.document;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patient-document")
@RequiredArgsConstructor
public class PatientDocumentController {

    private final PatientDocumentService documentService;

    /**
     * 📄 문서 단건 조회
     */
    @GetMapping("/{id}")
    public PatientDocument getDocument(@PathVariable Long id) {
        return documentService.getDocument(id);
    }

    /**
     * 📄 내원 기준 문서 목록
     */
    @GetMapping("/visit/{visitId}")
    public List<PatientDocument> getDocumentsByVisit(@PathVariable Long visitId) {
        return documentService.getDocumentsByVisit(visitId);
    }

    /**
     * 🔥 간호사용 전체 문서 조회
     */
    @GetMapping("/nurse/all")
    public List<PatientDocument> getAllForNurse() {
        return documentService.getAllForNurse();
    }
}
