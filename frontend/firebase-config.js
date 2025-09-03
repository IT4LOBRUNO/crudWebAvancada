import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDb1kg9BbghxoxUTPVGMZqhPQVP7QLBwEo",
  authDomain: "crudaulaweb.firebaseapp.com",
  projectId: "crudaulaweb",
  storageBucket: "crudaulaweb.firebasestorage.app",
  messagingSenderId: "885016125864",
  appId: "1:885016125864:web:cb42f8ecbeebcea6a83d9d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
