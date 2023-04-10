import { getUser } from "../public/js/Services/databaseServices.js";
import { User } from "../public/js/model/user.js";

getUser("qJ6ipz12ooMlIjkuDYqtnxTD6su2").then((user) => {
    var tutorName = user.name;
    var tutorMajor = user.major;
    document.getElementById('major').innerHTML = tutorMajor;
    document.getElementById('name').innerHTML = tutorName;
})


