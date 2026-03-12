let students = []

const nameInput = document.getElementById("name")
const scoreInput = document.getElementById("score")
const addBtn = document.getElementById("addBtn")
const tableBody = document.getElementById("tableBody")
const stats = document.getElementById("stats")

function getRank(score){

    if(score >= 8.5) return "Giỏi"
    if(score >= 7) return "Khá"
    if(score >= 5) return "Trung bình"
    return "Yếu"

}

function renderTable(){

    tableBody.innerHTML = ""

    students.forEach((sv,index)=>{

        const tr = document.createElement("tr")

        if(sv.score < 5){
            tr.classList.add("low-score")
        }

        tr.innerHTML = `
        <td>${index+1}</td>
        <td>${sv.name}</td>
        <td>${sv.score}</td>
        <td>${getRank(sv.score)}</td>
        <td>
        <button data-index="${index}" class="deleteBtn">Xóa</button>
        </td>
        `

        tableBody.appendChild(tr)

    })

    updateStats()

}

function updateStats(){

    const total = students.length

    if(total === 0){
        stats.textContent = "Chưa có sinh viên"
        return
    }

    let sum = 0

    students.forEach(s => sum += s.score)

    const avg = (sum / total).toFixed(2)

    stats.textContent = `Tổng sinh viên: ${total} | Điểm trung bình: ${avg}`

}

function addStudent(){

    const name = nameInput.value.trim()
    const score = parseFloat(scoreInput.value)

    if(name === ""){
        alert("Tên không được để trống")
        return
    }

    if(isNaN(score) || score < 0 || score > 10){
        alert("Điểm phải từ 0 đến 10")
        return
    }

    students.push({
        name: name,
        score: score
    })

    renderTable()

    nameInput.value = ""
    scoreInput.value = ""

    nameInput.focus()

}

addBtn.addEventListener("click", addStudent)

scoreInput.addEventListener("keyup", function(e){

    if(e.key === "Enter"){
        addStudent()
    }

})

tableBody.addEventListener("click", function(e){

    if(e.target.classList.contains("deleteBtn")){

        const index = e.target.getAttribute("data-index")

        students.splice(index,1)

        renderTable()

    }

})