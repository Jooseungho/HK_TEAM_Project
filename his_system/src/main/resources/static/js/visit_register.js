let selectedPatientId = null;

// ------------------[ 환자 목록 로드 ]------------------
async function loadPatients() {
    const res = await fetch("/api/patient/list");
    const list = await res.json();

    const box = document.getElementById("patientList");
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

        // 클릭 이벤트
        div.onclick = () => selectPatient(div, p);

        box.appendChild(div);
    });
}

// ------------------[ 환자 선택 ]------------------
function selectPatient(div, patient) {
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

// ------------------[ 오늘 접수 현황 로드 ]------------------
async function loadReceptionList() {
    const res = await fetch("/api/visit/today");
    const list = await res.json();

    const box = document.getElementById("receptionList");
    box.innerHTML = "";

    list.forEach(v => {
        const div = document.createElement("div");
        div.className = "rec-item";

        div.innerHTML = `
            <div>
                <div><b>${v.patient.name}</b></div>
                <div style="color:#777;">${v.registeredAt}</div>
            </div>
            <div class="rec-status">${v.status}</div>
        `;

        box.appendChild(div);
    });
}


// ------------------[ Vital + 접수 등록 ]------------------
document.getElementById("submitBtn").addEventListener("click", async () => {

    if (!selectedPatientId) {
        alert("환자를 선택해주세요");
        return;
    }

    const data = {
        patientId: selectedPatientId,
        nurseId: selectedNurseId, // 로그인 기능 생기면 교체
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

        // 접수 리스트 다시 불러오기
        loadWaitingList();

    } catch (err) {
        alert("오류 발생");
        console.error(err);
    }
});


// ------------------[ 초기 로드 ]------------------
window.onload = () => {
    loadPatients();
    loadReceptionList();
};
