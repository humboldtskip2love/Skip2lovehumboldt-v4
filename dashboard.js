import { db } from './firebase.js';
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const dbRef = ref(getDatabase(), 'listings');
const listingsContainer = document.getElementById("dashboard-listings");

onValue(dbRef, (snapshot) => {
  listingsContainer.innerHTML = ""; // Clear existing
  snapshot.forEach(childSnapshot => {
    const ad = childSnapshot.val();
    const div = document.createElement("div");
    div.className = "ad-item";
    div.innerHTML = `
      <h3>${ad.title}</h3>
      <p>${ad.description}</p>
      <p><strong>Posted by:</strong> ${ad.username}</p>
      <button onclick="messageUser('${ad.username}')">Message</button>
    `;
    listingsContainer.appendChild(div);
  });
});

function messageUser(username) {
  alert("Messaging " + username + " (feature coming soon!)");
}