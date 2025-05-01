import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

const firebaseConfig = {

  apiKey: "AIzaSyAqHl8T_S2YWhGNuWtjFV-7GE8Zqnmhj28",

  authDomain: "pump-plan.firebaseapp.com",

  projectId: "pump-plan",

  storageBucket: "pump-plan.firebasestorage.app",

  messagingSenderId: "745917737640",

  appId: "1:745917737640:web:ef41fd0ef723eb2cf5309d"

};

const app = initializeApp(firebaseConfig);
document.addEventListener("DOMContentLoaded", () => {
    const regBtn = document.getElementById("register-btn");
    regBtn.addEventListener("click", (event) => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const authStatus = document.getElementById("auth-status");
        if (email && password && password.length > 5){
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                authStatus.textContent = "User Registered Successfully!";
                const user = userCredential.user;
                window.location.href = "../pages/auth/login.html";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                authStatus.textContent = `Error: ${error.message}`;
            });
                
        } else {
            authStatus.textContent = "Please field all required inputs.";
        }
    })
})