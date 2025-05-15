import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBXZRw7boZ_0SxIt-Tk6CSCL6Ak_w9931s",
  authDomain: "skip2lovehumboldt.firebaseapp.com",
  projectId: "skip2lovehumboldt",
  storageBucket: "skip2lovehumboldt.firebasestorage.app",
  messagingSenderId: "705190662707",
  appId: "1:705190662707:web:f7889c30203c6136170946"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.register = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      document.getElementById("auth-status").innerText = "Registered successfully!";
    })
    .catch((error) => {
      document.getElementById("auth-status").innerText = error.message;
    });
}

window.login = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      document.getElementById("auth-status").innerText = "Logged in!";
    })
    .catch((error) => {
      document.getElementById("auth-status").innerText = error.message;
    });
}

import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const db = getFirestore(app);

window.postAd = async function () {
  const title = document.getElementById("ad-title").value;
  const desc = document.getElementById("ad-desc").value;
  const category = document.getElementById("ad-category").value;
  const phone = document.getElementById("ad-phone").value;
  const email = document.getElementById("ad-email").value;

  try {
    await addDoc(collection(db, "ads"), {
      title,
      desc,
      category,
      phone,
      email,
      createdAt: new Date()
    });
    document.getElementById("post-status").innerText = "Ad posted!";
  } catch (e) {
    document.getElementById("post-status").innerText = "Error: " + e.message;
  }
};

import { query, where, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

window.sendMessage = async function () {
  const recipient = document.getElementById("recipient-email").value;
  const message = document.getElementById("message-text").value;
  const sender = auth.currentUser?.email;

  if (!recipient || !message || !sender) return;

  try {
    await addDoc(collection(db, "messages"), {
      sender,
      recipient,
      message,
      timestamp: serverTimestamp()
    });
    document.getElementById("message-text").value = "";
  } catch (e) {
    alert("Error sending message: " + e.message);
  }
};

auth.onAuthStateChanged(user => {
  if (user) {
    const q = query(collection(db, "messages"), where("recipient", "==", user.email));
    onSnapshot(q, (snapshot) => {
      const container = document.getElementById("messages-container");
      container.innerHTML = "";
      snapshot.forEach(doc => {
        const data = doc.data();
        const div = document.createElement("div");
        div.innerHTML = `<strong>${data.sender}:</strong> ${data.message}`;
        container.appendChild(div);
      });
    });
  }
});