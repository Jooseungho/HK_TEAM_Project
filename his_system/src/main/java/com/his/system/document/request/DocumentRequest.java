package com.his.system.document.request;

import com.his.system.visit.Visit;
import com.his.system.staff.Staff;
import com.his.system.document.DocumentType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "DOCUMENT_REQUEST")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DocumentRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "REQUEST_ID")
    private Long id;

//    // 🔥 visit은 문서 발행 시점에만 연결
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "VISIT_ID", nullable = false)
    private Visit visit;

    @Enumerated(EnumType.STRING)
    @Column(name = "DOC_TYPE", nullable = false)
    private DocumentType docType;

    // 요청자 (간호사)
    @ManyToOne
    @JoinColumn(name = "REQUESTED_BY", nullable = false)
    private Staff requestedBy;

    @Column(name = "REQUESTED_AT")
    private LocalDateTime requestedAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS", nullable = false)
    private DocumentRequestStatus status;
}