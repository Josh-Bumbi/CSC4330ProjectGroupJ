import { getUser } from "../public/js/services/databaseServices.js";
import { User } from "../public/js/model/user.js";

getUser("qJ6ipz12ooMlIjkuDYqtnxTD6su2").then((user) => {
    var userName = user.name;
    var userMajor = user.major;
    document.getElementById('major').innerHTML = userMajor;
    document.getElementById('name').innerHTML = userName;
})


