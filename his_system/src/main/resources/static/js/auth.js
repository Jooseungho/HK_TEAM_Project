async function login() {
    const staffId = document.getElementById("staffId").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ staffId, password })
    });

    if (!response.ok) {
        alert("로그인 실패");
        return;
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);

    if (data.role === "DOCTOR") {
        location.href = "/html/doctor_dashboard.html";
    } else if (data.role === "NURSE") {
        location.href = "/html/nurse_dashboard.html";
    } else if (data.role === "ADMIN") {
        location.href = "/html/admin_dashboard.html";
    }
}
