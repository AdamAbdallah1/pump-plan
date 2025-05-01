import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyAqHl8T_S2YWhGNuWtjFV-7GE8Zqnmhj28",

  authDomain: "pump-plan.firebaseapp.com",

  projectId: "pump-plan",

  storageBucket: "pump-plan.firebasestorage.app",

  messagingSenderId: "745917737640",

  appId: "1:745917737640:web:ef41fd0ef723eb2cf5309d"

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const user = auth.currentUser;

onAuthStateChanged(auth, (user) => {
    if (user !== null) {
        const email = user.email;
        const currEmail = document.getElementById("email");
        currEmail.textContent = email;
      }
});