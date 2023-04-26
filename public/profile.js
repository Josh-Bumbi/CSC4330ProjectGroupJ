import { getUser,getCurrentUser,getAllReviews } from "./js/services/databaseServices.js";
import { signInUser, logout } from "./js/services/authServices.js";

function getIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}



var viewer;
var currentUser = await getCurrentUser();
var viewedUser = await getUser(getIdFromURL('id'));
// console.log(user)






var userName = viewedUser.name;
var userMajor = viewedUser.major;

//Finds the average rating to the nearest whole number
var ratings = await getAllReviews(viewedUser.userId);
var averageRating = 0;
var i = 0;
while(i < ratings.length){
    averageRating = averageRating + parseInt(ratings[i].stars);
    i++;
}
averageRating = averageRating/i;
averageRating = Math.round(averageRating);
console.log(averageRating);

if(averageRating == 1){
    document.getElementById('rating').innerHTML = "1/5 ★☆☆☆☆";
}
else if(averageRating == 2){
    document.getElementById('rating').innerHTML = "2/5 ★★☆☆☆";
}
else if(averageRating == 3){
    document.getElementById('rating').innerHTML = "3/5 ★★★☆☆";
}
else if(averageRating == 4){
    document.getElementById('rating').innerHTML = "4/5 ★★★★☆";
}
else if(averageRating == 5){
    document.getElementById('rating').innerHTML = "5/5 ★★★★★";
}

document.getElementById('major').innerHTML = userMajor;
document.getElementById('name').innerHTML = userName;

var currentUserType = currentUser.userType;
if (currentUserType == "student") {
    document.getElementById('makeApt').hidden = false;

    document.getElementById('makeApt').addEventListener('click', function () {

        window.location.href = "scheduleAppointment.html?id=" + getIdFromURL('id');
    });

}

// // TESTING
// signInUser("student1@lsu.edu", "Password12345!").then((userId) => {
// 	console.log(userId.uid)
// 	getCurrentUser().then((user) => {
// 		viewer = user;
//         var currentUserType = user.userType;
//         if (currentUserType == "student") {
//             document.getElementById('makeApt').hidden = false;
//         }
//         console.log(currentUserType); 
// 	})
// });
// //END TESTING

// getUser("qJ6ipz12ooMlIjkuDYqtnxTD6su2").then((user) => {
//     var userName = user.name;
//     var userMajor = user.major;
//     document.getElementById('major').innerHTML = userMajor;
//     document.getElementById('name').innerHTML = userName;
// })