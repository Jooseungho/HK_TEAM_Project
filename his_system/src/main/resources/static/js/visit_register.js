/* =========================================================
    공통 전역변수
========================================================= */
/*let selectedPatientId = null;     // 환자 선택
let selectedVisitId = null;       // 호출된 visitId 저장
const selectedNurseId = 1;        // 로그인 기능 도입 전 임시
*/

/* =========================================================
    1) 환자 목록 로드 (좌측 패널)
========================================================= */
/*async function loadPatients() {
    const res = await fetch("/api/patient/list");
    const list = await res.json();

    const box = document.getElementById("patientList");
    if (!box) return;
    box.innerHTML = "";

    list.forEach(p => {
        const div = document.createElement("div");
        div.className = "item";
        div.innerHTML = `
            <div><b>${p.name}</b> (${p.gender})</div>
            <div>차트번호: ${p.chartNo}</div>
            <div>생년월일: ${p.birthdate}</div>
            <div>연락처: ${p.phone}</div>
        `;

        div.onclick = () => selectPatient(div, p);
        box.appendChild(div);
    });
}


*//* =========================================================
    2) 환자 선택
========================================================= */
/*function selectPatient(div, patient) {
    document.querySelectorAll(".patient-list .item")
        .forEach(e => e.classList.remove("selected"));

    div.classList.add("selected");

    selectedPatientId = patient.id;

    const info = document.getElementById("selectedPatient");
    info.classList.remove("empty");
    info.innerHTML = `
        <b>${patient.name}</b><br>
        차트번호: ${patient.chartNo}<br>
        생년월일: ${patient.birthdate}
    `;
}


*//* =========================================================
    3) 오늘 접수 현황 로드
========================================================= */
/*async function loadReceptionList() {
    const res = await fetch("/api/visit/today");
    if (!res.ok) return;

    const list = await res.json();

    const box = document.getElementById("receptionList");
    if (!box) return;

    box.innerHTML = "";

    list.forEach(v => {
        const div = document.createElement("div");
        div.className = "rec-item";
        div.innerHTML = `
            <div>
                <div><b>${v.patient.name}</b></div>
                <div style="color:#777;">${v.arrivalTime}</div>
            </div>
            <div class="rec-status">${v.status}</div>
        `;
        box.appendChild(div);
    });
}


*//* =========================================================
    4) Vital + 접수 등록
========================================================= */
/*document.getElementById("submitBtn")?.addEventListener("click", async () => {

    if (!selectedPatientId) {
        alert("환자를 선택해주세요");
        return;
    }

    const data = {
        patientId: selectedPatientId,
        nurseId: selectedNurseId,
        bpSystolic: document.getElementById("bp_sys").value,
        bpDiastolic: document.getElementById("bp_dia").value,
        heartRate: document.getElementById("heart_rate").value,
        temperature: document.getElementById("temperature").value,
        respiration: document.getElementById("respiration").value,
        spo2: document.getElementById("spo2").value,
        memo: document.getElementById("memo").value
    };

    try {
        const response = await fetch("/api/visit/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error("접수 실패");

        alert("접수 완료!");

        // 새로고침
        loadWaitingList();
        loadReceptionList();

    } catch (err) {
        alert("오류 발생");
        console.error(err);
    }
});


*//* =========================================================
    5) 대기 환자 목록 로드 (중앙 패널)
========================================================= */
/*async function loadWaitingList() {
    const res = await fetch("/api/visit/waiting_list");
    const list = await res.json();

    const tbody = document.getElementById("waitingList");
    if (!tbody) return;

    tbody.innerHTML = "";

    list.forEach(v => {
        const tr = document.createElement("tr");
        tr.dataset.visitId = v.id;

        tr.innerHTML = `
            <td>${v.patient.name}</td>
            <td>${v.patient.chartNo}</td>
            <td>${v.arrivalTime.replace("T"," ").substring(11,16)}</td>
            <td>${v.status}</td>
            <td><button class="call-btn" onclick="callPatient(${v.id})">호출</button></td>
        `;

        tbody.appendChild(tr);
    });
}


*//* =========================================================
    6) 환자 호출 기능
========================================================= */
/*async function callPatient(visitId) {
    const doctorId = 1; // 로그인 후 수정

    const res = await fetch(`/api/visit/call/${visitId}/${doctorId}`, {
        method: "POST"
    });

    if (!res.ok) return alert("호출 실패");

    alert("환자 호출 완료");

    selectedVisitId = visitId;

    highlightCalledRow(visitId);
    displaySelectedPatient(visitId);
    loadWaitingList();
}


*//* =========================================================
    7) 우측 패널: 호출된 환자 표시
========================================================= */
/*async function displaySelectedPatient(visitId) {
    const res = await fetch(`/api/visit/${visitId}`);
    const v = await res.json();

    const box = document.getElementById("selectedPatientBox");
    if (!box) return;

    box.innerHTML = `
        <h3>${v.patient.name} (${v.patient.chartNo})</h3>
        <p>도착: ${v.arrivalTime.replace("T"," ")}</p>
        <p>상태: ${v.status}</p>
    `;

    document.getElementById("callActionBox").style.display = "block";
}


*//* =========================================================
    8) 호출된 행 강조 (파란색 highlight)
========================================================= */
/*function highlightCalledRow(visitId) {
    document.querySelectorAll("#waitingList tr").forEach(row => {
        row.classList.remove("called-row");
    });

    const row = document.querySelector(`#waitingList tr[data-visit-id='${visitId}']`);
    if (row) row.classList.add("called-row");
}


*//* =========================================================
    9) 진료 시작 / 종료
========================================================= */
/*async function startTreatment() {
    if (!selectedVisitId) return alert("먼저 환자를 호출하세요.");

    await fetch(`/api/visit/start/${selectedVisitId}`, { method: "POST" });
    alert("진료 시작");
}

async function finishTreatment() {
    if (!selectedVisitId) return alert("먼저 환자를 호출하세요.");

    await fetch(`/api/visit/finish/${selectedVisitId}`, { method: "POST" });
    alert("진료 종료");
}


*//* =========================================================
    10) 초기 로드
========================================================= */
/*window.onload = () => {
    loadPatients();
    loadReceptionList();
    loadWaitingList();
};*/