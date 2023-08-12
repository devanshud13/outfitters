function validatePassword(password) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return passwordPattern.test(password);
}

const newpass = document.getElementById("newPass");
const confirmpass = document.getElementById("confirmPass");
const submitbtn = document.getElementById("submitbtn");
const alerts = document.getElementById("alerts");

submitbtn.addEventListener("click", function (e) {
    if (newpass.value != confirmpass.value) {
        e.preventDefault();
        alerts.innerText = "Password does not match";
    }
    else if (!validatePassword(confirmpass.value)) {
        e.preventDefault();
        alerts.innerText = "Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one number, and one special symbol";
        alerts.style.height = "4rem";
        alerts.style.transition = "all 0.5s ease-in-out";
    }
})

