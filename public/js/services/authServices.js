import app from './firebaseConfig.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";


const auth = getAuth(app);



// Below functions trigger a window popup with message in event of error, probably a good idea to not do that at such a low level,
// but leaving it in for easy debugging 

// Will return userid if user successfully created, null if there was an error
async function createUser(email, password) {
    return createUserWithEmailAndPassword(auth, email, password).then((userCred) => {
        return userCred.user;
    })
    .catch((error) => {
        //Error while creating user.
        window.alert(error.message);
        return null;
    })
}


//create a function that gets the user id of the current logged in user
function getCurrentUserId() {
    if (auth.currentUser == null) {
        return null;
    }
        
    return auth.currentUser.uid;
}

// Will return userid if user successfully logged, null if there was an error


async function signInUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password).then((userCred) => {
        return userCred.user;
    })
    .catch((error) => {
        //Error while signing user in.
        window.alert(error.message);
        return null;
    });
}


export {createUser, signInUser, getCurrentUserId};

