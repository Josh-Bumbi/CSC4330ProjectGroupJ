import { getUser,getCurrentUser } from "../public/js/services/databaseServices.js";

var student;

// TESTING
signInUser("student1@lsu.edu", "Password12345!").then((userId) => {
	console.log(userId.uid)
	getCurrentUser().then((user) => {
		student = user;
        console.log(user);
        var userType = user.userType;
        
	})

});
//END TESTING

getUser("qJ6ipz12ooMlIjkuDYqtnxTD6su2").then((user) => {
    var userName = user.name;
    var userMajor = user.major;
    document.getElementById('major').innerHTML = userMajor;
    document.getElementById('name').innerHTML = userName;
})


