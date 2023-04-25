import { getUser } from "./services/databaseServices.js";
import { signInUser } from "./services/authServices.js";
import { Appointment} from "./model/appointment.js";
var tutor;
var student;

// TESTING
signInUser("student1@lsu.edu", "Password12345!").then((userId) => {
	console.log(userId.uid)
	getUser(userId.uid).then((user) => {
		student = user;
        console.log(user);
	})

});
//END TESTING



function displayAvailableTimeSlots(timeSlots) {
    const availableTimeSlots = document.getElementById('availableTimeSlots');
    availableTimeSlots.innerHTML = '';

    timeSlots.forEach(time => {
        const timeSlot = document.createElement('div');
        timeSlot.textContent = time;
        timeSlot.classList.add('time-slot');
        availableTimeSlots.appendChild(timeSlot);
    });


    const timeSlotsDiv = document.querySelectorAll('.time-slot');
    timeSlotsDiv.forEach(slot => {
        slot.addEventListener('click', function () {
            // Deselect all other time slots
            timeSlotsDiv.forEach(s => s.classList.remove('selected'));
            // Select the clicked time slot
            slot.classList.add('selected');
        });
    });
}

function getTutorIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}


async function getAvailableTimes() {
    //Every tutor will, by default, have available times from 9 AM to 5 PM (hourly)
    const availableTimes = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

    //get appointments for the selected date and tutor
    const tutorId = getTutorIdFromURL();
    const lowerBound = new Date(new Date(document.getElementById('appointmentDate').value).setDate(new Date(document.getElementById('appointmentDate').value).getDate() + 1));
    console.log(lowerBound);
    //get dates for filtering appointments (0:00 of selected date to 0:00 of next day)
    lowerBound.setHours(0,0,0,0)
    const upperBound = new Date();
    upperBound.setDate(lowerBound.getDate() + 1);
    upperBound.setHours(0,0,0,0);


    const appointments = tutor.scheduledAppointments;
       
    //Get appointments on the selected day
    const appointmentsOnDay = appointments.filter(appointment =>
        appointment.startTime >= lowerBound && appointment.endTime < upperBound
    );

    //Remove booked time slots from available times
    appointmentsOnDay.forEach(appointment => {
        const startTime = appointment.startTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }); //format time
        const index = availableTimes.indexOf(startTime);
        if (index !== -1) {
            availableTimes.splice(index, 1);
        }
    });

    return availableTimes;


}





document.addEventListener('DOMContentLoaded', async function () {
    // Time slot selection 

    const scheduleButton = document.getElementById('scheduleAppointment');
    scheduleButton.addEventListener('click', async function () {
        const selectedSlot = document.querySelector('.time-slot.selected');
        const description = document.getElementById('appointmentDescription').value;
        //Check if a time slot is selected
        if (selectedSlot && description != "") {
            //get the selected time
            const selectedTime = selectedSlot.textContent; // will be in the format "9:00 AM", "10:00 AM", etc.
            console.log(document.getElementById('appointmentDate').value)
            const appointmentDate = new Date(document.getElementById('appointmentDate').value).setDate(new Date(document.getElementById('appointmentDate').value).getDate() + 1);
            //convert the selected time to a Date object
            const startTime = new Date(appointmentDate);
            const [hours, minutes] = selectedTime.split(':');

            //convert the hours to 24 hour time
            const ampm = selectedTime.slice(-2);
            startTime.setHours(ampm === 'AM' ? parseInt(hours) % 12 : (parseInt(hours) % 12) + 12);
            startTime.setMinutes(parseInt(minutes));
    
            //all appointments are 1 hour long
            const endTime = new Date(startTime);
            endTime.setHours(startTime.getHours() + 1);
            const appointment = new Appointment(tutor, student, startTime, endTime, description);
            
            student.addAppointment(appointment).then(() => {
                window.location.href = 'studentHome.html';
            });
    
            
            

        } else {
            alert('Please select a time slot and enter a description.');
        }
    });



    const datePicker = document.getElementById('appointmentDate');
    const today = new Date().toISOString().substr(0, 10);
    datePicker.setAttribute('min', today);

    // Add an event listener to the date picker
    datePicker.addEventListener('change', async function () {
        const selectedDate = datePicker.value;

        if (selectedDate) {
            //Get available times for the tutor on the selected date
            const availableTimes = await getAvailableTimes(selectedDate);

            //Display the available time slots
            displayAvailableTimeSlots(availableTimes);
        }
    });



    // Tutor Info
    const tutorId = getTutorIdFromURL();
    tutor = await getUser(tutorId);

    const tutorName = document.getElementById('tutorName');
    tutorName.textContent = tutor.name;
    
    const tutorMajor = document.getElementById('tutorSubject');
    tutorMajor.textContent = tutor.major;
    

});