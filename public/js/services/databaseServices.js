import app from "./firebaseConfig.js";
import {getDatabase, ref, set} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";

const db = getDatabase(app);

//If we had more time, would want to make writes done server-side with authentication instead of client-side

async function writeStudentData(userId, name, email, grade, major) {
    return set(ref(db, 'users/' + userId), {
      name: name,
      email: email,
      grade : grade,
      userType: 'student',
      major: major
    });
}



export {writeStudentData};