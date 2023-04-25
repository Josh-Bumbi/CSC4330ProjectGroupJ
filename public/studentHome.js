// src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
// src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.2/js/bootstrap.bundle.min.js"
import { getTutors, getCurrentUser, getUser } from "./js/services/databaseServices.js";
import { logout } from "./js/services/authServices.js";


var tutorData = await getTutors();
var currentUser = await getCurrentUser();
// filterTutors()


var subjectFilter = document.getElementById("subjectFilter");
subjectFilter.addEventListener("change", filterTutors);

function filterTutors() {
  var selectedSubject = subjectFilter.value;
  var filteredTutors = tutorData.filter(function (tutor) {
    return selectedSubject === "all subjects" || tutor.subject === selectedSubject;
  });

  $("#tutorListItems").empty(); // clear previous list items

  filteredTutors.forEach(function (tutor) {
    var listItem = $("<li>");
    var container = $("<div>").addClass("tutor-container");
    var imageContainer = $("<div>").addClass("tutor-image");
    var image = $("<img>").attr("src", "school_icon.png").addClass("img-thumbnail");
    imageContainer.append(image);
    // link on name will bring the student to the tutor's profile
    var nameLink = $("<a>").attr("href", "profileTutor.html?id=$" + tutor.userId).text(tutor.name);
    var name = $("<h4>").append(nameLink).addClass("tutor-name");
    var subject = $("<p>").text(tutor.major).addClass("tutor-subject");
    var infoContainer = $("<div>").addClass("tutor-info");
    infoContainer.append(name, subject);
    container.append(imageContainer, infoContainer);
    listItem.append(container);
    $("#tutorListItems").append(listItem);
  });
}


async function displayUpcomingSessions(sessions) {
  var upcomingSessionsContainer = document.getElementById("upcomingSessions");

  sessions.forEach(async function (session) {
    var sessionContainer = document.createElement("div");
    sessionContainer.classList.add("session-container");

    var date = new Date(session.startTime);
    
    //format dates
    var dateString = date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    var startTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    var endTime = new Date(session.endTime).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    var sessionInfo = document.createElement("div");
    sessionInfo.classList.add("session-info");

    var sessionDate = document.createElement("h4");
    sessionDate.textContent = dateString;
    sessionDate.classList.add("session-date");

    var sessionTime = document.createElement("p");
    sessionTime.textContent = startTime + " - " + endTime;
    sessionTime.classList.add("session-time");

    // need to get tutor name from db
    var tutorObj = await getUser(session.tutor);

    var sessionTutor = document.createElement("p");
    sessionTutor.textContent = "Tutor: " + tutorObj.name;
    sessionTutor.classList.add("session-tutor");

    var sessionDescription = document.createElement("p");
    sessionDescription.textContent = "Description: " + session.description;
    sessionDescription.classList.add("session-description");

    sessionInfo.append(sessionDate, sessionTime, sessionTutor, sessionDescription);
    sessionContainer.appendChild(sessionInfo);
    upcomingSessionsContainer.appendChild(sessionContainer);
  });
}



displayUpcomingSessions(currentUser.scheduledAppointments);
filterTutors();
