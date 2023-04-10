// src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
// src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.2/js/bootstrap.bundle.min.js"
import { getTutors } from "../public/js/Services/databaseServices.js";

        var tutorData = [];
        var tutors = await getTutors();
        
        tutors.forEach(function(tutor) {
            console.log(tutor)
            tutorData.push({
                'name': tutor.name,
                'picture': '',
                'subject': tutor.major,
            })
        })
        console.log(tutorData)

      
        var subjectFilter = document.getElementById("subjectFilter");
        subjectFilter.addEventListener("change", filterTutors);
      
        function filterTutors() {
          var selectedSubject = subjectFilter.value;
          var filteredTutors = tutorData.filter(function(tutor) {
            return selectedSubject === "all subjects" || tutor.subject === selectedSubject;
          });
      
          $('#tutorListItems').empty(); // clear previous list items
      
          filteredTutors.forEach(function(tutor) {
            var listItem = $('<li>');
            var container = $('<div>').addClass('tutor-container');
            var image = $('<img>').attr('src', tutor.picture);
            // link on name will bring the student to the tutor's profile 
            var nameLink = $('<a>').attr('href', '').text(tutor.name);
            var name = $('<h4>').append(nameLink);
            var subject = $('<p>').text(tutor.subject);
            container.append(image, name, subject);
            listItem.append(container);
            $('#tutorListItems').append(listItem);
          });
        }
