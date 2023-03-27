import { createUser, signInUser } from "./services/authServices.js";
import { writeStudentData } from "./services/databaseServices.js";

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

//SIGN-IN USAGE
// signInUser("dwichm1@lsu.edu", "Password1234$").then((userId) => {
//     console.log(userId)
// });



//NEW-STUDENT USAGE

// var studentEmail = "student@lsu.edu";
// var studentPassword = "Password12345!";
// var studentName = "Test Student";
// var studentGrade = "Junior";
// var studentMajor = "Computer Science";



// createUser(studentEmail, studentPassword).then((user) => {
//     if (user != null) {
//         //User authentication was successful, push user data to database
//         writeStudentData(user.uid, studentName, studentEmail, studentGrade, studentMajor).then( _ => {
//             window.alert("User successfully created!");
//         })
//     } else {
//         //There was some sort of error with authentication (password not complex enough, email already being used, etc.)   
//     }
// }) 

