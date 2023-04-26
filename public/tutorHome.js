import { getTutors, getCurrentUser, getUser, getAllReviews } from "./js/services/databaseServices.js";
import { logout } from "./js/services/authServices.js";

var currentUser = await getCurrentUser();

var reviews = await getAllReviews(currentUser.userId);
console.log(currentUser.userId);
displayReviews(reviews);


  
  async function displayReviews(reviews) {
    reviews.forEach(async function (review) {
      var reviewer = await getUser(review.reviewerId);
      var listItem = $("<li>").addClass("mb-3");
      var container = $('<div>').addClass('review-container');
      var reviewer = $('<h5>').text(reviewer.name);
      var rating = $('<p>').text('Rating: ' + review.stars + '/5');
      var comment = $('<p>').text(review.message);
      container.append(reviewer, rating, comment);
      listItem.append(container);
      $('#reviewListItems').append(listItem);
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
      var studentObj = await getUser(session.student);
  
      var sessionTutor = document.createElement("p");
      sessionTutor.textContent = "Student: " + studentObj.name;
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