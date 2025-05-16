import { db } from './firebase.js';
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const messageForm = document.getElementById("messageForm");
const statusDiv = document.getElementById("status");

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const fromUser = document.getElementById("fromUser").value;
  const toUser = document.getElementById("toUser").value;
  const content = document.getElementById("content").value;

  const messagesRef = ref(getDatabase(), 'messages/' + toUser);
  push(messagesRef, { from: fromUser, content })
    .then(() => {
      statusDiv.textContent = "Message sent!";
      messageForm.reset();
    })
    .catch((err) => {
      statusDiv.textContent = "Error: " + err.message;
    });
});