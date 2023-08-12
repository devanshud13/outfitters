const newpass = document.getElementById("newPass");
const confirmpass = document.getElementById("confirmPass");
const submitbtn = document.getElementById("submitbtn");
const alerts = document.getElementById("alerts");

submitbtn.addEventListener("click", function (e) {
    if (newpass.value != confirmpass.value) {
        e.preventDefault();
        alerts.innerText = "Password does not match";
        
    }
})