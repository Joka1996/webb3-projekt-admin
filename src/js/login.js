"use strict";
// skapa en användare
let username = document.getElementById("username");
let pw = document.getElementById("pw");
let loginBTN = document.getElementById("loginBTN");

// spara admin i localStorage
function store() {
  localStorage.setItem("username", username.value);
  localStorage.setItem("pw", pw.value);
}

// joel joelpassword/ admin admin
// kolla inlogg, stämmer det med ls så skicka till course.hmtl
function check() {
  let storedUsername = localStorage.getItem("username");
  let storedPW = localStorage.getItem("pw");

  let checkUsername = document.getElementById("checkUsername");
  let checkPW = document.getElementById("checkPW");

  if (checkUsername.value == storedUsername && checkPW.value == storedPW) {
    // Simulate an HTTP redirect:
    window.location =
      "https://studenter.miun.se/~joka2005/writeable/webb3/projektAdmin/pub/course.html";
  } else {
    alert("Fel användarnamn/lösenord");
  }
}
