function getToken() {
    return localStorage.getItem("token");
}

async function logout() {
    try {
        await fetch("/api/admin/system-logs/logout-log", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + getToken()
            }
        });
    } catch (e) {
        // 로그 실패해도 로그아웃은 진행
    }

    localStorage.removeItem("token");
    location.href = "/html/login.html";
}

// 인증이 필요한 Fetch 래퍼 함수
async function apiGet(url) {
    return fetch(url, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    }).then(res => res.json());
}

window.logout = logout;
