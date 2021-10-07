"use strict";

// const foo = (a, b) => a + b;
// variabler
let output = document.getElementById("output");
let outputUpdate = document.getElementById("updateOutput");
let deleteButton = document.getElementById("deleteButton");
let addButton = document.getElementById("addButton");
let codeInput = document.getElementById("formCode");
let nameInput = document.getElementById("formName");
let progInput = document.getElementById("formProg");
let gradeInput = document.getElementById("formGrade");
let syllabusInput = document.getElementById("formSyllabus");

// variabler uppdatera
let updateID = document.getElementById("formIDdUpdate");
let updateButton = document.getElementById("updateButton");
let updateCode = document.getElementById("formCodeUpdate");
let updateName = document.getElementById("formNameUpdate");
let updateProg = document.getElementById("formProgUpdate");
let updateGrade = document.getElementById("formGradeUpdate");
let updateSyllabus = document.getElementById("formSyllabusUpdate");
document.getElementById("hide").style.display = "none";

// händelsehanterare
window.addEventListener("load", getCourses);
addButton.addEventListener("click", addCourse);
updateButton.addEventListener("click", updateCourse);

// funktioner
function getCourses() {
  // tömma
  output.innerHTML = "";

  fetch(
    "https://studenter.miun.se/~joka2005/writeable/webb3/student-API/api.php"
  )
    .then((res) => res.json())
    .then((data) => {
      data.forEach(function (course) {
        // en koll så att det fungerar
        // console.log(course);
        output.innerHTML += `
        <tr id="row">
        <td data-label="Uppdatera"> <button id="${course.id}" onClick="updateCourse(${course.id})"> Uppdatera</button></td>
        <td data-label="Kurskod">${course.course_code}</td>
        <td data-label="Kursnamn">${course.course_name}</td>
        <td data-label="Progression">${course.course_progression}</td>
        <td data-label="Slutbetyg">${course.course_grade}</td>
        <td data-label="Kursplan"><a href="${course.course_syllabus}" target="_blank">Webblänk</a></td>
        <td data-label="Radera"><button class="redButton" id=${course.id} onClick="deleteCourse(${course.id})">Radera</button></td>
        </tr>
        `;
      });
    });
}

function addCourse() {
  // hämta värdet i formuläret
  let course_code = codeInput.value;
  let course_name = nameInput.value;
  let course_progression = progInput.value;
  let course_grade = gradeInput.value;
  let course_syllabus = syllabusInput.value;
  // lagra som objekt.
  let course = {
    course_code: course_code,
    course_name: course_name,
    course_progression: course_progression,
    course_grade: course_grade,
    course_syllabus: course_syllabus,
  };

  // metod post för att vi ska skicka till databasen. SKicka med datan i json-format.
  fetch(
    "https://studenter.miun.se/~joka2005/writeable/webb3/student-API/api.php",
    { method: "POST", body: JSON.stringify(course) }
  )
    .then((res) => res.json())
    .then((data) => {
      // ladda om listan om något lagts till.
      getCourses();
      // location.reload();
    })
    // om något blir fel så skickas ett felmeddelande.
    .catch((error) => {
      console.log("Error: ", error);
    });
}

function deleteCourse(id) {
  // Skicka med id och vilken metod som ska användas i URL
  fetch(
    "https://studenter.miun.se/~joka2005/writeable/webb3/student-API/api.php?id=" +
      id,
    { method: "DELETE" }
  )
    .then((res) => res.json())
    .then((data) => {
      // ladda om listan om något raderas.
      getCourses();
    })
    // om något blir fel så skickas ett felmeddelande.
    .catch((error) => {
      console.log("Error: ", error);
    });
}

function updateCourse(id) {
  document.getElementById("hide").style.display = "";
  let id2 = updateID.value;
  let course_code2 = updateCode.value;
  let course_name2 = updateName.value;
  let course_progression2 = updateProg.value;
  let course_grade2 = updateGrade.value;
  let course_syllabus2 = updateSyllabus.value;
  let Updatecourse = {
    id: id2,
    course_code: course_code2,
    course_name: course_name2,
    course_progression: course_progression2,
    course_grade: course_grade2,
    course_syllabus: course_syllabus2,
  };
  // Skicka med id och vilken metod som ska användas i URL
  fetch(
    "https://studenter.miun.se/~joka2005/writeable/webb3/student-API/api.php?id=" +
      id,
    {
      method: "PUT",
      body: JSON.stringify(Updatecourse),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      // ladda om listan om något uppdateras.
      getCourses();
    })
    // om något blir fel så skickas ett felmeddelande.
    .catch((error) => {
      console.log("Error: ", error);
    });
}
