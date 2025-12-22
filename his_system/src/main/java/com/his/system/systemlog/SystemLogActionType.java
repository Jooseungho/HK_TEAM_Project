package com.his.system.systemlog;

public enum SystemLogActionType {

    // 인증 / 세션
    LOGIN("로그인"),
    LOGOUT("로그아웃"),

    // 환자 / 접수
    PATIENT_REGISTER("환자 접수"),
    PATIENT_UPDATE("환자 정보 수정"),

    // EMR
    EMR_VIEW("EMR 조회"),
    EMR_EDIT("EMR 수정"),

    // 문서 / 기타
    DOCUMENT_ISSUE("문서 발행"),
    DOCUMENT_PRINT("문서 출력"),

    // 계정 관리 🔥 추가
    ACCOUNT_DEACTIVATE("계정 퇴사 처리"),
    
    // 시스템
    SYSTEM_ACCESS("시스템 접근"),
    SYSTEM_ERROR("시스템 오류");

    private final String label;

    SystemLogActionType(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}