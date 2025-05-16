import { db } from './firebase.js';
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

window.loadInbox = () => {
  const username = document.getElementById("username").value;
  const messagesRef = ref(getDatabase(), 'messages/' + username);
  const messagesList = document.getElementById("messages");
  messagesList.innerHTML = "";

  onValue(messagesRef, (snapshot) => {
    messagesList.innerHTML = "";
    snapshot.forEach((msg) => {
      const li = document.createElement("li");
      li.textContent = `${msg.val().from}: ${msg.val().content}`;
      messagesList.appendChild(li);
    });
  });
};