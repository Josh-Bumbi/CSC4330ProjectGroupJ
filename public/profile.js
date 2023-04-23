import { getUser,getCurrentUser } from "./js/services/databaseServices.js";
import { signInUser } from "./js/services/authServices.js";

var viewer;

document.getElementById('makeApt').hidden = true;

// TESTING
signInUser("tutor1@lsu.edu", "Password12345!").then((userId) => {
	console.log(userId.uid)
	getCurrentUser().then((user) => {
		viewer = user;
        console.log(user);
        var currentUserType = user.userType;
        if (currentUserType == "student") {
            document.getElementById('makeApt').hidden = false;
        }
        console.log(currentUserType); 
	})

});
//END TESTING

getUser("qJ6ipz12ooMlIjkuDYqtnxTD6su2").then((user) => {
    var userName = user.name;
    var userMajor = user.major;
    document.getElementById('major').innerHTML = userMajor;
    document.getElementById('name').innerHTML = userName;
})


