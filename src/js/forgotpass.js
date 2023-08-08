const newpass = document.getElementById("newPass");
const confirmpass = document.getElementById("confirmPass");
const submitbtn = document.getElementById("submitbtn");
const alerts = document.getElementById("alerts");
console.log(newpass.value);
console.log(confirmpass.value);

submitbtn.addEventListener("click", function (e) {
    console.log(newpass.value);
    console.log(confirmpass.value);
    if (newpass.value != confirmpass.value) {
        e.preventDefault();
        alerts.innerText = "Password does not match";
        
    }
})