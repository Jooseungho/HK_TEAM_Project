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
    // 로그인/컨트롤러에서는 employeeNo를 쓰고,
    // Service에서 Staff 조회 후 staffId 기반으로 연관관계 설정
    public DocumentRequest createRequest(String nurseEmployeeNo, DocumentType docType) {

        Staff nurse = staffRepository.findByEmployeeNo(nurseEmployeeNo)
                .orElseThrow(() -> new RuntimeException("간호사 없음: " + nurseEmployeeNo));

        DocumentRequest request = DocumentRequest.builder()
                .docType(docType)
                .requestedBy(nurse) // FK는 staffId로 자동 연결됨
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

    // 🔧 간호사별 수신 문서
    // Repository는 staffId 기준으로 조회
    public List<DocumentRequest> getReceivedDocuments(String nurseEmployeeNo) {

        Staff nurse = staffRepository.findByEmployeeNo(nurseEmployeeNo)
                .orElseThrow(() -> new RuntimeException("간호사 없음: " + nurseEmployeeNo));

        return requestRepository.findByRequestedBy_StaffIdAndStatus(
                nurse.getStaffId(),
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
