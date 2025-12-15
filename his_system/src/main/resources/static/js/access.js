function checkAccess(allowedRoles = []) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // 1) 로그인 여부 검사
    if (!token || !role) {
        alert("로그인이 필요합니다.");
        location.href = "/html/login.html";
        return;
    }

    // 2) 역할 검사
    if (!allowedRoles.includes(role)) {
        alert("접근 권한이 없습니다.");
        location.href = "/html/login.html";
        return;
    }
}
