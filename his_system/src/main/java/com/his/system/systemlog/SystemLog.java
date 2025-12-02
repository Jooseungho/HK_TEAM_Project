package com.his.system.systemlog;

import com.his.system.staff.Staff;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "SYSTEM_LOG")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SystemLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "LOG_ID")
    private Long id;

    // 직원 FK (행위를 수행한 사람)
    @ManyToOne
    @JoinColumn(name = "STAFF_ID")
    private Staff staff;

    @Column(name = "ACTION_TYPE", length = 50)
    private String actionType;

    @Column(name = "TARGET_ID")
    private Long targetId;

    @Column(name = "DESCRIPTION", length = 255)
    private String description;

    @Column(name = "CREATED_AT")
    private LocalDateTime createdAt;
}
