package com.his.system.document;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/document")
@RequiredArgsConstructor
public class PatientDocumentController {

    private final PatientDocumentService documentService;

    // 문서 생성
    @PostMapping("/create")
    public PatientDocument createDocument(@RequestParam Long visitId,
                                          @RequestParam Long staffId,
                                          @RequestParam DocumentType type,
                                          @RequestBody String htmlContent) {

        return documentService.createDocument(visitId, staffId, type, htmlContent);
    }

    // 문서 상세 조회
    @GetMapping("/{id}")
    public PatientDocument getDocument(@PathVariable Long id) {
        return documentService.getDocument(id);
    }

    // 내원별 문서 목록 조회
    @GetMapping("/visit/{visitId}")
    public List<PatientDocument> getDocumentsByVisit(@PathVariable Long visitId) {
        return documentService.getDocumentsByVisit(visitId);
    }
}
