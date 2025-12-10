/*function getToken() {
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
*/