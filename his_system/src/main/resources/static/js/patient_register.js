document.getElementById("patientForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        birthdate: document.getElementById("birthdate").value,
        gender: document.getElementById("gender").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value
    };

    try {
        const response = await fetch("/api/patient/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error("등록 실패");

        const result = await response.json();

        const msg = document.getElementById("result-msg");
        msg.style.display = "block";
        msg.innerText = `등록 완료! 환자번호: ${result.id}, 차트번호: ${result.chartNo}`;

    } catch (error) {
        alert("등록 중 오류 발생");
        console.error(error);
    }
});
