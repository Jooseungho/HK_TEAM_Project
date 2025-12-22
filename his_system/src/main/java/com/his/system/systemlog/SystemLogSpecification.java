package com.his.system.systemlog;

import com.his.system.staff.Staff;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;

public class SystemLogSpecification {

    public static Specification<SystemLog> search(
            String employeeNo,
            String actionType,
            LocalDateTime from,
            LocalDateTime to
    ) {
        return (root, query, cb) -> {
            var predicate = cb.conjunction();

            // 직원번호 필터
            if (employeeNo != null && !employeeNo.isBlank()) {
                Join<SystemLog, Staff> staffJoin = root.join("staff");
                predicate = cb.and(
                        predicate,
                        cb.equal(staffJoin.get("employeeNo"), employeeNo)
                );
            }

            // 액션 타입 필터
            if (actionType != null && !actionType.isBlank()) {
                predicate = cb.and(
                        predicate,
                        cb.equal(root.get("actionType"), actionType)
                );
            }

            // 날짜 FROM
            if (from != null) {
                predicate = cb.and(
                        predicate,
                        cb.greaterThanOrEqualTo(root.get("createdAt"), from)
                );
            }

            // 날짜 TO
            if (to != null) {
                predicate = cb.and(
                        predicate,
                        cb.lessThanOrEqualTo(root.get("createdAt"), to)
                );
            }

            return predicate;
        };
    }
}