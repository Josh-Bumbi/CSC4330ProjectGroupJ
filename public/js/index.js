import { User, UserType } from "./Model/user.js";
import { createUser, signInUser, getCurrentUserId } from "./services/authServices.js";
import { writeUserData, getCurrentUser, getUser, getTutors} from "./services/databaseServices.js";
import {Appointment} from "./Model/appointment.js";
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});



//NEW-STUDENT USAGE

// var studentEmail = "student1@lsu.edu";
// var studentPassword = "Password12345!";
// var studentName = "Test Student";
// var studentGrade = "Junior";
// var studentMajor = "Computer Science";

// var newUser  = new User(null, studentName, studentEmail, UserType.STUDENT, studentGrade, studentMajor);

// createUser(studentEmail, studentPassword).then((user) => {
//     if (user != null) {
//         //User authentication was successful, push user data to database
// 		newUser.userId = user.uid;
//         writeUserData(newUser).then( _ => {
//             window.alert("User successfully created!");
//         })
//     } else {
//         //There was some sort of error with authentication (password not complex enough, email already being used, etc.)   
//     }
// }) 


//SIGN IN USER USAGE
// signInUser("student1@lsu.edu", "Password12345!").then((userId) => {
// 	console.log(userId)
// 	console.log(getCurrentUserId())
// 	getCurrentUser().then((user) => {
// 		console.log(user);
// 	})

// });

// console.log(getCurrentUser())





//APPOINTMENT SCHEDULING USAGE
// const studentId = "lFHl9aurtdXoY8Ta0n0tQ3hzDEq1"; // Test student ID (already exists in database)
// const tutorId = "qJ6ipz12ooMlIjkuDYqtnxTD6su2"; // Test tutor ID (already exists in database)

// const student = await getUser(studentId);
// const tutor = await getUser(tutorId);

// // Create three appointments
// const startTime1 = new Date(2023, 4, 10, 9, 0); // May 10, 2023, 9:00 AM
// const endTime1 = new Date(2023, 4, 10, 10, 0); // May 10, 2023, 10:00 AM

// const startTime2 = new Date(2023, 4, 11, 9, 0); // May 11, 2023, 9:00 AM
// const endTime2 = new Date(2023, 4, 11, 10, 0); // May 11, 2023, 10:00 AM

// const startTime3 = new Date(2023, 4, 11, 9, 30); // May 11, 2023, 9:30 AM (conflicting)
// const endTime3 = new Date(2023, 4, 11, 10, 30); // May 11, 2023, 10:30 AM (conflicting)

// try {
//     const appointment1 = new Appointment(tutor, student, startTime1, endTime1, "Math tutoring");
//     await student.addAppointment(appointment1);
//     console.log("Appointment 1 added successfully");
//   } catch (error) {
//     console.log("Error adding appointment 1:", error.message);
//   }

//   try {
//     const appointment2 = new Appointment(tutor, student, startTime2, endTime2, "Math tutoring");
//     await student.addAppointment(appointment2);
//     console.log("Appointment 2 added successfully");
//   } catch (error) {
//     console.log("Error adding appointment 2:", error.message);
//   }

//   try {
//     const appointment3 = new Appointment(tutor, student, startTime3, endTime3, "Math tutoring (conflicting)");
//     await student.addAppointment(appointment3);
//     console.log("Appointment 3 added successfully");
//   } catch (error) {
//     console.log("Error adding appointment 3:", error.message);
//   }



// console.log("Student:", student);
// console.log("Student Appointments:", student.scheduledAppointments);

// console.log("Tutor:", tutor);
// console.log("Tutor Appointments:", tutor.scheduledAppointments);