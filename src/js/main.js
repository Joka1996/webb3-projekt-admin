"use strict";
// courses
// const foo = (a, b) => a + b;
// variabler
let output = document.getElementById("output");
let outputUpdate = document.getElementById("updateOutput");
let deleteButton = document.getElementById("deleteButton");
let addButton = document.getElementById("addButton");
let uniInput = document.getElementById("formUni");
let nameInput = document.getElementById("formName");
let periodInput = document.getElementById("formPeriod");
let gradeInput = document.getElementById("formGrade");
let syllabusInput = document.getElementById("formSyllabus");

// variabler uppdatera
let updateID = document.getElementById("formIDUpdate");
let updateButton = document.getElementById("updateButton");
let updateUni = document.getElementById("formUniUpdate");
let updateName = document.getElementById("formNameUpdate");
let updatePeriod = document.getElementById("formPeriodUpdate");
let updateGrade = document.getElementById("formGradeUpdate");
let updateSyllabus = document.getElementById("formSyllabusUpdate");
// document.getElementById("hide").style.display = "none";

// händelsehanterare
window.addEventListener("load", getCourses);
addButton.addEventListener("click", function (e) {
  e.preventDefault();
  addCourse();
});
updateButton.addEventListener("click", function (e) {
  e.preventDefault();
  updateCourse();
});

// funktioner
function getCourses() {
  // tömma
  output.innerHTML = "";

  fetch(
    "https://studenter.miun.se/~joka2005/writeable/webb3/API/student-API/courseAPI.php"
  )
    .then((res) => res.json())
    .then((data) => {
      data.forEach(function (course) {
        // en koll så att det fungerar
        // console.log(course);
        output.innerHTML += `
        <tr class="row">
        <td data-label="ID"><a id="${course.id}" href="#section2" onClick="reveal(this.id)">Id:${course.id}</a></td>
        <td data-label="Lärosäte">${course.course_school}</td>
        <td data-label="Kursnamn">${course.course_name}</td>
        <td data-label="Läsperiod">${course.course_time}</td>
        <td data-label="Slutbetyg">${course.course_grade}</td>
        <td data-label="Kursplan"><a href="${course.course_syllabus}" target="_blank">Webblänk</a></td>
        <td data-label="Radera"><button class="redButton" id=${course.id} onClick="deleteCourse(${course.id})">Radera</button></td>
        </tr>
        `;
      });
    });
}
// lägg till
function addCourse() {
  // hämta värdet i formuläret
  let course_school = uniInput.value;
  let course_name = nameInput.value;
  let course_time = periodInput.value;
  let course_grade = gradeInput.value;
  let course_syllabus = syllabusInput.value;
  // lagra som objekt.
  let course = {
    course_school: course_school,
    course_name: course_name,
    course_time: course_time,
    course_grade: course_grade,
    course_syllabus: course_syllabus,
  };

  // metod post för att vi ska skicka till databasen. SKicka med datan i json-format.
  fetch(
    "https://studenter.miun.se/~joka2005/writeable/webb3/API/student-API/courseAPI.php",
    { method: "POST", body: JSON.stringify(course) }
  )
    .then((res) => res.json())
    .then((data) => {
      // ladda om listan om något lagts till.
      getCourses();
    })
    // om något blir fel så skickas ett felmeddelande.
    .catch((error) => {
      console.log("Error: ", error);
    });
}

const deleteCourse = (id) => {
  // Skicka med id och vilken metod som ska användas i URL
  fetch(
    "https://studenter.miun.se/~joka2005/writeable/webb3/API/student-API/courseAPI.php?id=" +
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
};
// skicka id till uppdateringsformulär

const reveal = (clicked_id) => {
  document.getElementById("formIDUpdate").value = clicked_id;
};

// uppdatera en kurs
function updateCourse() {
  // e.preventDefault();
  let clicked_id = updateID.value;
  let course_school2 = updateUni.value;
  let course_name2 = updateName.value;
  let course_period2 = updatePeriod.value;
  let course_grade2 = updateGrade.value;
  let course_syllabus2 = updateSyllabus.value;
  let Updatecourse = {
    id: clicked_id,
    course_school: course_school2,
    course_name: course_name2,
    course_time: course_period2,
    course_grade: course_grade2,
    course_syllabus: course_syllabus2,
  };
  // Skicka med id och vilken metod som ska användas i URL
  fetch(
    "https://studenter.miun.se/~joka2005/writeable/webb3/API/student-API/courseAPI.php?id=" +
      clicked_id,
    {
      method: "PUT",
      body: JSON.stringify(Updatecourse),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      // ladda om listan om något uppdateras.
      getCourses();
      // window.scrollTo(0, 0);
    })
    // om något blir fel så skickas ett felmeddelande.
    .catch((error) => {
      console.log("Error: ", error);
    });
}

// work ************************************ work

// variabler;
let outputWork = document.getElementById("outputWork");
let placeInputWork = document.getElementById("formPlace-work");
let titelInputWork = document.getElementById("formTitel-work");
let yearInputWork = document.getElementById("formYear-work");
let addWorkButton = document.getElementById("addButton-work");
let deleteWorkButton = document.getElementById("deleteWorkButton");
// v uppdatera
let updateIDwork = document.getElementById("formIDUpdate-work");
let updateWorkPlace = document.getElementById("formPlaceUpdate-work");
let updateTitelWork = document.getElementById("formTitelUpdate-work");
let updateYearWork = document.getElementById("formYearUpdate-work");
let updateWorkButton = document.getElementById("updateButton-work");

// händelsehanterare
window.addEventListener("load", getWork);
addWorkButton.addEventListener("click", function (e) {
  e.preventDefault();
  addWork();
});
updateWorkButton.addEventListener("click", function (e) {
  e.preventDefault();
  updateWork();
});

function getWork() {
  outputWork.innerHTML = "";
  fetch(
    "https://studenter.miun.se/~joka2005/writeable/webb3/API/student-API/workAPI.php"
  )
    .then((res) => res.json())
    .then((data) => {
      data.forEach(function (work) {
        // console.log(work);
        outputWork.innerHTML += `
        <tr class="row">
        <td data-label="ID"><a id="${work.id}" href="#updateWork" onClick="sendIDwork(this.id)">Id:${work.id}</a></td>
        <td data-label="Arbetsplats">${work.work_place}</td>
        <td data-label="Titel">${work.work_title}</td>
        <td data-label="År">${work.work_year}</td>
        <td data-label="Radera"><button class="redButton" id=work-${work.id} onClick="deleteWork(${work.id})">Radera</button></td>
        </tr>
        `;
      });
    });
}
// lägg till
function addWork() {
  let work_place = placeInputWork.value;
  let work_year = yearInputWork.value;
  let work_title = titelInputWork.value;

  // lagra
  let work = {
    work_place: work_place,
    work_year: work_year,
    work_title: work_title,
  };

  fetch(
    "https://studenter.miun.se/~joka2005/writeable/webb3/API/student-API/workAPI.php",
    { method: "POST", body: JSON.stringify(work) }
  )
    .then((res) => res.json())
    .then((data) => {
      getWork();
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
}
// ta bort
const deleteWork = (id) => {
  fetch(
    "https://studenter.miun.se/~joka2005/writeable/webb3/API/student-API/workAPI.php?id=" +
      id,
    { method: "DELETE" }
  )
    .then((res) => res.json())
    .then((data) => {
      getWork();
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
};

const sendIDwork = (clicked_id) => {
  updateIDwork.value = clicked_id;
};

// uppdatera
function updateWork() {
  let clicked_id = updateIDwork.value;
  let work_place2 = updateWorkPlace.value;
  let work_title2 = updateTitelWork.value;
  let work_year2 = updateYearWork.value;
  // objekt
  let updateWork = {
    id: clicked_id,
    work_place: work_place2,
    work_title: work_title2,
    work_year: work_year2,
  };
  fetch(
    "https://studenter.miun.se/~joka2005/writeable/webb3/API/student-API/workAPI.php?id=" +
      clicked_id,
    {
      method: "PUT",
      body: JSON.stringify(updateWork),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      // ladda om
      getWork();
    })
    // felmeddelande.
    .catch((error) => {
      console.log("Error: ", error);
    });
}

// *******************Website**********************
// variabler
let outputWeb = document.getElementById("outputWeb");
let nameInputWeb = document.getElementById("formWebName");
let courseInputWeb = document.getElementById("formWebCourse");
let aboutInputWeb = document.getElementById("formWebAbout");
let urlInputWeb = document.getElementById("formWebURL");
let picInputWeb = document.getElementById("formWebPic");
let addButtonWeb = document.getElementById("addButtonWeb");
let deleteButtonWeb = document.getElementById("deleteButtonWeb");
// variabler för att uppdatera
let updateIDWeb = document.getElementById("webIDUpdate");
let updateNameWeb = document.getElementById("webIDUpdate");
let updateCourseWeb = document.getElementById("webCourseUpdate");
let updateAboutWeb = document.getElementById("webAboutUpdate");
let updateUrlWeb = document.getElementById("webURLUpdate");
let updatePicWeb = document.getElementById("webPicUpdate");
let updateButtonWeb = document.getElementById("updateButtonWeb");
// händelsehanterare.
window.addEventListener("load", getWeb);
addButtonWeb.addEventListener("click", function (e) {
  e.preventDefault();
  addWeb();
});
updateButtonWeb.addEventListener("click", function (e) {
  e.preventDefault();
  updateWeb();
});

// Hämta
function getWeb() {
  outputWeb.innerHTML = "";
  fetch(
    "https://studenter.miun.se/~joka2005/writeable/webb3/API/student-API/websiteAPI.php"
  )
    .then((res) => res.json())
    .then((data) => {
      data.forEach(function (web) {
        outputWeb.innerHTML += `
      <tr class="row">
        <td data-label="Uppdatera"><a id="${web.id}" href="#updateWebsite" onClick="sendIDweb(this.id)">Id:${web.id}</a></td>
        <td data-label="Namn">${web.website_name}</td>
        <td data-label="Kurs">${web.website_course}</td>
        <td data-label="Om">${web.website_about}</td>
        <td data-label="URL">${web.website_url}</td>
        <td data-label="Bild"> <img src= ${web.website_img} alt="Webbplats-${web.website_name}"></td>
        <td data-label="Radera"><button class="redButton" id=web-${web.id} onClick="deleteWeb(${web.id})">Radera</button></td>
        </tr>
      `;
      });
    });
}

// lägg till
function addWeb() {
  let website_name = nameInputWeb.value;
  let website_course = courseInputWeb.value;
  let website_about = aboutInputWeb.value;
  let website_url = urlInputWeb.value;
  let website_img = picInputWeb.value;

  let website = {
    website_name: website_name,
    website_course: website_course,
    website_about: website_about,
    website_url: website_url,
    website_img: website_img,
  };
  fetch(
    "https://studenter.miun.se/~joka2005/writeable/webb3/API/student-API/websiteAPI.php",
    {
      method: "POST",
      body: JSON.stringify(website),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      getWeb();
    })
    // felmeddelande
    .catch((error) => {
      console.log("Error: ", error);
    });
}

// ta bort
const deleteWeb = (id) => {
  fetch(
    "https://studenter.miun.se/~joka2005/writeable/webb3/API/student-API/websiteAPI.php?id=" +
      id,
    {
      method: "DELETE",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      getWeb();
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
};
// skicka det klickade-id till formuläret.
const sendIDweb = (clicked_id) => {
  updateIDWeb.value = clicked_id;
};

// uppdatera
function updateWeb() {
  let clicked_id = updateIDWeb.value;
  let website_name2 = updateNameWeb.value;
  let website_course2 = updateCourseWeb.value;
  let website_about2 = updateAboutWeb.value;
  let website_url2 = updateUrlWeb.value;
  let website_img2 = updatePicWeb.value;

  let updateWebsite = {
    id: clicked_id,
    website_name: website_name2,
    website_course: website_course2,
    website_about: website_about2,
    website_url: website_url2,
    website_img: website_img2,
  };
  fetch(
    "https://studenter.miun.se/~joka2005/writeable/webb3/API/student-API/websiteAPI.php?id=" +
      clicked_id,
    {
      method: "PUT",
      body: JSON.stringify(updateWebsite),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      getWeb();
    })
    // och så felmeddelande.
    .catch((error) => {
      console.log("Error: ", error);
    });
}
