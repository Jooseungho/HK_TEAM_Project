package com.his.system.document.request;

import com.his.system.document.DocumentType;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/document-request")
@RequiredArgsConstructor
public class DocumentRequestController {

    private final DocumentRequestService requestService;

    // 요청 생성
    @PostMapping
    public DocumentRequest createRequest(
            @RequestParam Long nurseId,
            @RequestParam DocumentType docType
    ) {
        return requestService.createRequest(nurseId, docType);
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

    // 기존 유지
    @GetMapping("/sent")
    public List<SentDocumentDTO> getSentList() {
        return requestService.getSentList();
    }

    @PatchMapping("/{requestId}/complete")
    public void completeRequest(@PathVariable Long requestId) {
        requestService.completeRequest(requestId);
    }

    @GetMapping("/received/{nurseId}")
    public List<DocumentRequest> getReceived(@PathVariable Long nurseId) {
        return requestService.getReceivedDocuments(nurseId);
    }
}
