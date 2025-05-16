import { db } from './firebase.js';
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const postForm = document.getElementById("postForm");
const statusDiv = document.getElementById("status");

postForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const username = document.getElementById("username").value;

  const dbRef = ref(getDatabase(), 'listings');
  push(dbRef, { title, description, username })
    .then(() => {
      statusDiv.textContent = "Listing posted!";
      postForm.reset();
    })
    .catch((err) => {
      statusDiv.textContent = "Error: " + err.message;
    });
});