import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBXZRw7boZ_0SxIt-Tk6CSCL6Ak_w9931s",
  authDomain: "skip2lovehumboldt.firebaseapp.com",
  projectId: "skip2lovehumboldt",
  storageBucket: "skip2lovehumboldt.appspot.com",
  messagingSenderId: "705190662707",
  appId: "1:705190662707:web:f7889c30203c6136170946",
  databaseURL: "https://skip2lovehumboldt-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };