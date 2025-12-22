function getToken() {
    return localStorage.getItem("token");
}

function logout() {
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

async function authFetch(url, options = {}) {
    const token = localStorage.getItem("token"); // 🔥 핵심

    if (!token) {
        alert("로그인 토큰 없음");
        throw new Error("No token");
    }

    options.headers = {
        ...(options.headers || {}),
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
    };

    return fetch(url, options);
}

