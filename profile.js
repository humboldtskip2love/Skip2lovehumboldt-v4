import { db } from './firebase.js';
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const profileForm = document.getElementById("profileForm");
const statusDiv = document.getElementById("status");

profileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const age = document.getElementById("age").value;
  const location = document.getElementById("location").value;
  const bio = document.getElementById("bio").value;
  const img = document.getElementById("img").value;
  const userType = document.getElementById("userType").value;

  const profileRef = ref(getDatabase(), 'profiles/' + username);
  set(profileRef, { age, location, bio, img, userType })
    .then(() => {
      statusDiv.textContent = "Profile saved!";
      profileForm.reset();
    })
    .catch((err) => {
      statusDiv.textContent = "Error: " + err.message;
    });
});