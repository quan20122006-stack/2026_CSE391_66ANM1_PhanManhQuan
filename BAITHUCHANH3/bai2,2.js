const prices = {

ao:150000,
quan:200000,
giay:500000

}

const product = document.getElementById("product")
const quantity = document.getElementById("quantity")
const delivery = document.getElementById("delivery")
const address = document.getElementById("address")
const note = document.getElementById("note")

const total = document.getElementById("total")
const charCount = document.getElementById("charCount")

const form = document.getElementById("orderForm")
const summary = document.getElementById("summary")

function showError(id,msg){

document.getElementById(id).textContent = msg

}

function clearError(id){

document.getElementById(id).textContent = ""

}

function calcTotal(){

let p = product.value
let q = Number(quantity.value)

if(p && q){

let money = prices[p] * q

total.textContent =
money.toLocaleString("vi-VN")

}else{

total.textContent = 0

}

}

product.addEventListener("change",calcTotal)

quantity.addEventListener("input",calcTotal)

note.addEventListener("input",()=>{

let len = note.value.length

charCount.textContent = len + " / 200"

if(len>200){

charCount.style.color="red"

}else{

charCount.style.color="black"

}

})

function validateProduct(){

if(product.value===""){

showError("productError","Chọn sản phẩm")

return false

}

clearError("productError")

return true

}

function validateQuantity(){

let q = Number(quantity.value)

if(!q || q<1 || q>99){

showError("quantityError","Số lượng 1-99")

return false

}

clearError("quantityError")

return true

}

function validateDelivery(){

let selected = new Date(delivery.value)

let today = new Date()

today.setHours(0,0,0,0)

let maxDate = new Date()

maxDate.setDate(today.getDate()+30)

if(!delivery.value){

showError("deliveryError","Chọn ngày giao")

return false

}

if(selected < today){

showError("deliveryError","Không chọn ngày quá khứ")

return false

}

if(selected > maxDate){

showError("deliveryError","Không quá 30 ngày")

return false

}

clearError("deliveryError")

return true

}

function validateAddress(){

let text = address.value.trim()

if(text.length <10){

showError("addressError","Địa chỉ ≥ 10 ký tự")

return false

}

clearError("addressError")

return true

}

function validatePay(){

let checked = document.querySelector("input[name='pay']:checked")

if(!checked){

showError("payError","Chọn phương thức thanh toán")

return false

}

clearError("payError")

return true

}

form.addEventListener("submit",(e)=>{

e.preventDefault()

let valid =
validateProduct() &
validateQuantity() &
validateDelivery() &
validateAddress() &
validatePay()

if(!valid) return

let pName = product.options[product.selectedIndex].text
let q = quantity.value
let d = delivery.value
let t = total.textContent

summary.style.display="block"

summary.innerHTML = `
<h3>Xác nhận đơn hàng</h3>

<p>Sản phẩm: ${pName}</p>

<p>Số lượng: ${q}</p>

<p>Ngày giao: ${d}</p>

<p>Tổng tiền: ${t} VND</p>

<button id="confirmBtn">Xác nhận</button>
<button id="cancelBtn">Hủy</button>
`

document.getElementById("confirmBtn").onclick = function(){

summary.innerHTML = "<h3>Đặt hàng thành công 🎉</h3>"

}

document.getElementById("cancelBtn").onclick = function(){

summary.style.display="none"

}

})