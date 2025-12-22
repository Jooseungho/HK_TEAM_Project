package com.his.system.document;

import com.his.system.document.dto.DocumentContextResponse;
import com.his.system.visit.Visit;
import com.his.system.visit.VisitRepository;
import com.his.system.staff.Staff;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/document")
@RequiredArgsConstructor
public class DocumentController {

    private final VisitRepository visitRepository;
    private final PatientDocumentService documentService;

    // 📌 문서 작성용 컨텍스트
    @GetMapping("/context/{visitId}")
    public DocumentContextResponse getContext(@PathVariable Long visitId) {

        Visit visit = visitRepository.findById(visitId)
                .orElseThrow(() -> new RuntimeException("내원 정보 없음"));

        Staff doctor = visit.getDoctor();

        return new DocumentContextResponse(
                visit.getId(),
                visit.getPatient().getId(),
                visit.getPatient().getName(),
                visit.getPatient().getChartNo(),
                visit.getPatient().getBirthdate().toString(),
                doctor.getEmployeeNo(),
                doctor.getName()
        );
    }

    // 📌 문서 생성 (의사 → 간호사 요청 자동 연결)
    @PostMapping("/create")
    public void createDocument(
            @RequestParam Long visitId,
            @RequestParam DocumentType type,
            @RequestBody String content
    ) {
        String employeeNo =
                SecurityContextHolder.getContext()
                        .getAuthentication()
                        .getName();

        documentService.createDocument(
                visitId,
                employeeNo,
                type,
                content
        );
    }
}
