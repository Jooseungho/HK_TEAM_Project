package com.his.system.document.request;

import com.his.system.document.DocumentType;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/document-request")
@RequiredArgsConstructor
public class DocumentRequestController {

    private final DocumentRequestService requestService;

    // 🔥 요청 생성
    // JWT 인증 기준: 로그인한 사용자(employeeNo)로 요청 생성
    @PostMapping
    public DocumentRequest createRequest(
            @RequestParam DocumentType docType,
            Authentication authentication
    ) {
        String employeeNo = (String) authentication.getPrincipal();
        return requestService.createRequest(employeeNo, docType);
    }

    // ✅ 요청 대기 (DTO)
    @GetMapping("/requested")
    public List<DocumentRequestDTO> getRequestedList() {
        return requestService.getRequestedList();
    }

    // ✅ 최근 발행 완료 (DTO)
    @GetMapping("/completed")
    public List<DocumentRequestDTO> getCompletedList() {
        return requestService.getCompletedList();
    }

    // 🔧 발행 완료 목록 (기존 유지)
    @GetMapping("/sent")
    public List<SentDocumentDTO> getSentList() {
        return requestService.getSentList();
    }

    // 🔥 문서 요청 완료 처리
    @PatchMapping("/{requestId}/complete")
    public void completeRequest(@PathVariable Long requestId) {
        requestService.completeRequest(requestId);
    }

    // 🔧 간호사별 수신 문서
    // JWT 기준으로 본인 문서만 조회
    @GetMapping("/received")
    public List<DocumentRequest> getReceived(Authentication authentication) {
        String employeeNo = (String) authentication.getPrincipal();
        return requestService.getReceivedDocuments(employeeNo);
    }
}
