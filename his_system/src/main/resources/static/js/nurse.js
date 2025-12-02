async function registerPatient() {
    const patient = {
        name: document.getElementById("name").value,
        rrn: document.getElementById("rrn").value,
        gender: document.getElementById("gender").value,
        phone: document.getElementById("phone").value
    };

    const token = localStorage.getItem("token");

    const response = await fetch("/api/nurse/patient/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(patient)
    });

    if (!response.ok) {
        alert("환자 등록 실패!");
        return;
    }

    alert("환자 등록 완료!");
    location.href = "/html/nurse_dashboard.html";
}
