package com.his.system.document.request;

public enum DocumentRequestStatus {
    REQUESTED,   // 요청 대기
    SENT,        // 문서 발행 완료 (의사 → 간호사)
    COMPLETED    // 다운로드 완료
}
