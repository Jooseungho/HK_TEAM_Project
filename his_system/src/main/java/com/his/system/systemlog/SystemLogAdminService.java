package com.his.system.systemlog;

import com.his.system.systemlog.SystemLogResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class SystemLogAdminService {

    private final SystemLogRepository systemLogRepository;

    public Page<SystemLogResponseDto> searchLogs(
            String employeeNo,
            String actionType,
            LocalDateTime from,
            LocalDateTime to,
            int page,
            int size
    ) {

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(Sort.Direction.DESC, "createdAt")
        );

        var spec = SystemLogSpecification.search(
                employeeNo,
                actionType,
                from,
                to
        );

        return systemLogRepository.findAll(spec, pageable)
                .map(SystemLogResponseDto::from);
    }
}