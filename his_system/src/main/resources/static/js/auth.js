async function login() {
    const employeeNo = document.getElementById("staffId").value; // 🔥 수정됨
    const password = document.getElementById("password").value;

    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ employeeNo, password })
    });

    if (!response.ok) {
        alert("로그인 실패");
        return;
    }

    const data = await response.json();

    // JWT 저장
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("staffId", data.staffId);
    localStorage.setItem("name", data.name); // 🔥 있으면 사용, 없으면 제거

    // 역할별 화면 이동
    if (data.role === "DOCTOR") {
        location.href = "/html/doctor_dashboard.html";
    } 
    else if (data.role === "NURSE") {
        location.href = "/html/nurse_dashboard.html";
    } 
    else if (data.role === "ADMIN") {
        location.href = "/html/admin_dashboard.html";
    } 
    else {
        alert("알 수 없는 권한입니다.");
    }
}
