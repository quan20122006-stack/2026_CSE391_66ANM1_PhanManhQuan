let students = [];
let filteredStudents = [];
let sortAsc = true;

const nameInput = document.getElementById("name");
const scoreInput = document.getElementById("score");
const addBtn = document.getElementById("addBtn");
const tableBody = document.getElementById("tableBody");
const stats = document.getElementById("stats");
const searchInput = document.getElementById("search");
const filterRank = document.getElementById("filterRank");
const scoreHeader = document.getElementById("scoreHeader");

function getRank(score) {
    if (score >= 8.5) return "Giỏi";
    if (score >= 7) return "Khá";
    if (score >= 5) return "Trung bình";
    return "Yếu";
}

function addStudent() {
    const name = nameInput.value.trim();
    const score = parseFloat(scoreInput.value);

    if (name === "") {
        alert("Tên không được để trống");
        return;
    }

    if (isNaN(score) || score < 0 || score > 10) {
        alert("Điểm phải từ 0 đến 10");
        return;
    }

    students.push({
        name: name,
        score: score
    });

    nameInput.value = "";
    scoreInput.value = "";
    nameInput.focus();

    applyFilters(); 
    updateStats();
}

function applyFilters() {
    let keyword = searchInput.value.toLowerCase();
    let rank = filterRank.value;

    filteredStudents = students.filter(s => {
        let matchName = s.name.toLowerCase().includes(keyword);
        let matchRank = rank === "all" || getRank(s.score) === rank;
        return matchName && matchRank;
    });

    filteredStudents.sort((a, b) => {
        if (sortAsc) {
            return a.score - b.score;
        } else {
            return b.score - a.score;
        }
    });

    renderFiltered();
}

function renderFiltered() {
    tableBody.innerHTML = "";

    if (filteredStudents.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5">Không có kết quả</td></tr>`;
        return;
    }

    filteredStudents.forEach((sv, index) => {
        let tr = document.createElement("tr");

        if (sv.score < 5) {
            tr.classList.add("low-score");
        }

        let originalIndex = students.indexOf(sv);

        tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${sv.name}</td>
        <td>${sv.score}</td>
        <td>${getRank(sv.score)}</td>
        <td>
            <button data-index="${originalIndex}" class="deleteBtn">Xóa</button>
        </td>
        `;

        tableBody.appendChild(tr);
    });
}

function updateStats() {
    const total = students.length;

    if (total === 0) {
        stats.textContent = "Chưa có sinh viên";
        return;
    }

    let sum = 0;
    students.forEach(s => sum += s.score);
    const avg = (sum / total).toFixed(2);
    stats.textContent = `Tổng sinh viên: ${total} | Điểm trung bình: ${avg}`;
}

addBtn.addEventListener("click", addStudent);

scoreInput.addEventListener("keyup", function(e) {
    if (e.key === "Enter") {
        addStudent();
    }
});

tableBody.addEventListener("click", function(e) {
    if (e.target.classList.contains("deleteBtn")) {
        const index = e.target.getAttribute("data-index");
        students.splice(index, 1); 
        applyFilters();            
        updateStats();             
    }
});

searchInput.addEventListener("input", applyFilters);
filterRank.addEventListener("change", applyFilters);
scoreHeader.addEventListener("click", () => {
    sortAsc = !sortAsc;
    applyFilters();
});