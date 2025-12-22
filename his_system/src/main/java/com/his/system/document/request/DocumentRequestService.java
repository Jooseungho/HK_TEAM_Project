package com.his.system.document.request;

import com.his.system.document.DocumentType;
import com.his.system.staff.Staff;
import com.his.system.staff.StaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DocumentRequestService {

    private final DocumentRequestRepository requestRepository;
    private final StaffRepository staffRepository;

    // 🔥 요청 생성
    public DocumentRequest createRequest(Long nurseId, DocumentType docType) {

        Staff nurse = staffRepository.findById(nurseId)
                .orElseThrow(() -> new RuntimeException("간호사 없음"));

        DocumentRequest request = DocumentRequest.builder()
                .docType(docType)
                .requestedBy(nurse)
                .requestedAt(LocalDateTime.now())
                .status(DocumentRequestStatus.REQUESTED)
                .build();

        return requestRepository.save(request);
    }

    // ✅ 요청 대기 (DTO)
    public List<DocumentRequestDTO> getRequestedList() {
        return requestRepository.findByStatusDTO(DocumentRequestStatus.REQUESTED);
    }

    // ✅ 최근 발행 완료 (DTO)
    public List<DocumentRequestDTO> getCompletedList() {
        return requestRepository.findByStatusDTO(DocumentRequestStatus.COMPLETED);
    }

    // 🔥 상태 변경
    public void completeRequest(Long requestId) {
        DocumentRequest request = requestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("문서 요청 없음"));
        request.setStatus(DocumentRequestStatus.COMPLETED);
        requestRepository.save(request);
    }

    // 🔧 기존 유지 (혹시 다른 화면에서 사용 중이면)
    public List<DocumentRequest> getReceivedDocuments(Long nurseId) {
        return requestRepository.findByRequestedBy_IdAndStatus(
            nurseId,
            DocumentRequestStatus.SENT
        );
    }

    // 🔧 기존 SentDocumentDTO 유지
    public List<SentDocumentDTO> getSentList() {
        return requestRepository.findByStatus(DocumentRequestStatus.SENT)
                .stream()
                .map(r -> new SentDocumentDTO(
                        r.getId(),
                        r.getDocType().name(),
                        r.getRequestedAt(),
                        r.getVisit().getPatient().getName(),
                        r.getVisit().getPatient().getChartNo()
                ))
                .toList();
    }
}
