import { getUser } from "../public/js/Services/databaseServices";
import { User } from "../public/js/model/user";

getUser("qJ6ipz12ooMlIjkuDYqtnxTD6su2").then((User) => {
    var tutorName = User.name;
    var tutorMajor = User.major;
    document.getElementById('major').innerHTML = tutorMajor;
    document.getElementById('name').innerHTML = tutorName;
})


