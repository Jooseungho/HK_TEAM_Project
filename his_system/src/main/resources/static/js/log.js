let currentPage = 0;
const pageSize = 10;

function loadLogs(page) {
    currentPage = page;

    const employeeNo = document.getElementById("employeeNo").value;
    const actionType = document.getElementById("actionType").value;
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;

    let url = `/api/admin/system-logs?page=${page}&size=${pageSize}`;

    if (employeeNo) url += `&employeeNo=${employeeNo}`;
    if (actionType) url += `&actionType=${actionType}`;
    if (from) url += `&from=${from}`;
    if (to) url += `&to=${to}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            renderTable(data.content);
            renderPagination(data.totalPages);
        });
}

function renderTable(logs) {
    const tbody = document.getElementById("logTableBody");
    tbody.innerHTML = "";

    logs.forEach(log => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${formatDate(log.createdAt)}</td>
            <td>${log.staffName} (${log.employeeNo})</td>
            <td>${log.actionType}</td>
            <td>${log.targetId ?? "-"}</td>
            <td>${log.description}</td>
        `;

        tbody.appendChild(tr);
    });
}

function renderPagination(totalPages) {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    for (let i = 0; i < totalPages; i++) {
        const btn = document.createElement("button");
        btn.innerText = i + 1;
        btn.onclick = () => loadLogs(i);

        if (i === currentPage) {
            btn.style.fontWeight = "bold";
        }

        pagination.appendChild(btn);
    }
}

function formatDate(dateTime) {
    return dateTime.replace("T", " ").substring(0, 19);
}

// 최초 로딩
loadLogs(0);
