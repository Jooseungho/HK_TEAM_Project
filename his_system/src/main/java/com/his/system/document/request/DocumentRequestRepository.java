package com.his.system.document.request;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.his.system.document.DocumentType;

import java.util.List;
import java.util.Optional;

public interface DocumentRequestRepository
        extends JpaRepository<DocumentRequest, Long> {

    // 기존 유지
    List<DocumentRequest> findByStatus(DocumentRequestStatus status);

    Optional<DocumentRequest>
    findByVisit_IdAndDocTypeAndStatus(
        Long visitId,
        DocumentType docType,
        DocumentRequestStatus status
    );

    List<DocumentRequest> findByRequestedBy_StaffId(Long staffId);

    List<DocumentRequest> findByRequestedBy_StaffIdAndStatus(
            Long staffId,
            DocumentRequestStatus status
    );


    // 🔥 DTO 전용 (요청 대기 / 완료 공용)
    @Query("""
        select new com.his.system.document.request.DocumentRequestDTO(
            dr.id,
            v.id,
            p.name,
            p.chartNo,
            dr.docType,
            dr.requestedAt
        )
        from DocumentRequest dr
        join dr.visit v
        join v.patient p
        where dr.status = :status
    """)
    List<DocumentRequestDTO> findByStatusDTO(
        @Param("status") DocumentRequestStatus status
    );
}
