package com.his.system.document;

import com.his.system.visit.Visit;
import com.his.system.staff.Staff;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "PATIENT_DOCUMENT")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatientDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "DOCUMENT_ID")
    private Long id;

    // VISIT FK
    @ManyToOne
    @JoinColumn(name = "VISIT_ID", nullable = false)
    private Visit visit;

    @Enumerated(EnumType.STRING)
    @Column(name = "DOC_TYPE", nullable = false)
    private DocumentType docType;

    @Column(name = "CONTENT_HTML", columnDefinition = "MEDIUMTEXT", nullable = false)
    private String contentHtml;

    // 작성자(Staff)
    @ManyToOne
    @JoinColumn(name = "CREATED_BY", nullable = false)
    private Staff createdBy;

    @Column(name = "CREATED_AT")
    private LocalDateTime createdAt;
}
