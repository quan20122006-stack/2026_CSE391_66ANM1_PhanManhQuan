const form = document.getElementById("registerForm")

function showError(id,msg){

document.getElementById(id).textContent = msg

}

function clearError(id){

document.getElementById(id).textContent = ""

}

function validateName(){

let name = fullname.value.trim()

let regex = /^[a-zA-ZÀ-ỹ\s]+$/

if(name.length <3){

showError("fullnameError","Tên phải ≥ 3 ký tự")

return false
}

if(!regex.test(name)){

showError("fullnameError","Tên chỉ chứa chữ")

return false
}

clearError("fullnameError")

return true

}

function validateEmail(){

let regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/

if(!regex.test(email.value)){

showError("emailError","Email không hợp lệ")

return false
}

clearError("emailError")

return true
}

function validatePhone(){

let regex=/^0[0-9]{9}$/

if(!regex.test(phone.value)){

showError("phoneError","SĐT không hợp lệ")

return false
}

clearError("phoneError")

return true
}

function validatePassword(){

let regex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

if(!regex.test(password.value)){

showError("passError","Mật khẩu yếu")

return false
}

clearError("passError")

return true
}

function validateConfirm(){

if(confirm.value !== password.value){

showError("confirmError","Mật khẩu không khớp")

return false
}

clearError("confirmError")

return true
}

function validateGender(){

let checked = document.querySelector("input[name='gender']:checked")

if(!checked){

showError("genderError","Chọn giới tính")

return false
}

clearError("genderError")

return true
}

function validateTerms(){

if(!terms.checked){

showError("termsError","Phải đồng ý điều khoản")

return false
}

clearError("termsError")

return true
}

form.addEventListener("submit",(e)=>{

e.preventDefault()

let valid =
validateName() &
validateEmail() &
validatePhone() &
validatePassword() &
validateConfirm() &
validateGender() &
validateTerms()

if(valid){

form.style.display="none"

success.innerHTML="Đăng ký thành công 🎉"

}

})