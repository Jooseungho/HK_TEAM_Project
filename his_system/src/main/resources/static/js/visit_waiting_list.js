async function loadWaitingList() {
    const res = await fetch("/api/visit/waiting_list");
    const list = await res.json();

    const container = document.getElementById("waiting-list");
    container.innerHTML = "";

    list.forEach(v => {
        const item = document.createElement("div");
        item.className = "waiting-item";

        item.innerHTML = `
            <div class="number">${v.id}</div>
            <div class="info">
                <div class="name">${v.patient.name}</div>
                <div class="time">${formatTime(v.arrivalTime)}</div>
            </div>
            <span class="tag yellow">대기</span>
        `;

        container.appendChild(item);
    });
}
async function callPatient(visitId) {
    try {
        const doctorId = 1; // 로그인한 의사 ID로 변경 필요

        const res = await fetch(`/api/visit/call/${visitId}/${doctorId}`, {
            method: "POST"
        });

        if (!res.ok) throw new Error("환자 호출 실패");

        alert("환자를 호출했습니다.");
        loadWaitingList();  // 대기 목록 새로고침
    } catch (err) {
        alert("호출 중 오류 발생");
        console.error(err);
    }
}

