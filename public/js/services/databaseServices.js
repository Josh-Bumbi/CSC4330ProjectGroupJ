import app from "./firebaseConfig.js";
import {getDatabase, ref, set, push, get, orderByChild, equalTo, query} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
import {getCurrentUserId} from "./authServices.js";
import {User, UserType, Admin, Student, Tutor} from "../model/user.js";
import {Appointment} from "../model/appointment.js";

const db = getDatabase(app);

//If we had more time, would want to make writes done server-side with authentication instead of client-side

async function writeUserData(user) {
  return set(ref(db, 'users/' + user.userId), {
    name: user.name,
    email: user.email,
    grade: user.grade,
    userType: user.userType,
    major: user.major
  });
}

async function writeAppointmentData(appointment) {
  if (appointment.appointmentId != null) {
    throw new Error('Appointment already exists');
  } 
  
  const appointmentRef = push(ref(db, 'appointments'));
  const appointmentId = appointmentRef.key;

  await set(appointmentRef, {
    tutorId: appointment.tutor.userId,
    studentId: appointment.student.userId,
    startTime: appointment.startTime.toISOString(),
    endTime: appointment.endTime.toISOString(),
    description: appointment.description
  });

  return appointmentId;
}



async function getCurrentUser() {
  var userId = getCurrentUserId();
  if (userId == null) {
    throw new Error('No user logged in');
  }
  return getUser(userId);

  
}

async function getUser(userId) {
  const userRef = ref(db, 'users/' + userId);
  const snapshot = await get(userRef);

  if (snapshot.exists()) {
    const userData = snapshot.val();
    let user;

    switch (userData.userType) {
      case UserType.ADMIN:
        user = new Admin(userId, userData.name, userData.email);
        break;
      case UserType.STUDENT:
        user = new Student(userId, userData.name, userData.email, userData.grade, userData.major);
        break;
      case UserType.TUTOR:
        user = new Tutor(userId, userData.name, userData.email, userData.grade, userData.major);
        break;
      default:
        throw new Error('Invalid user type');
    }

    if (user instanceof Student || user instanceof Tutor) {
      const appointments = await getUserAppointments(userId);
      user.scheduledAppointments = appointments;
    }

    return user;
  } else {
    throw new Error('User not found');
  }
}



async function getAppointment(appointmentId) {
  const appointmentRef = ref(db, 'appointments/' + appointmentId);
  const snapshot = await get(appointmentRef);

  if (snapshot.exists()) {
    const appointmentData = snapshot.val();
    const tutor = await getCurrentUser(appointmentData.tutorId);
    const student = await getCurrentUser(appointmentData.studentId);
    const startTime = new Date(appointmentData.startTime);
    const endTime = new Date(appointmentData.endTime);
    const description = appointmentData.description;

    return new Appointment(tutor, student, startTime, endTime, description, appointmentId);
  } else {
    throw new Error('Appointment not found');
  }
}



async function getUserAppointments(userId) {

  //since we don't know if the user is a student or tutor from id, we need to query both
  const appointmentsRef = ref(db, 'appointments');
  const snapshot = await get(
    query(appointmentsRef, orderByChild('tutorId'), equalTo(userId))
  );
  const tutorAppointments = snapshot.exists() ? snapshot.val() : {};

  const snapshot2 = await get(
    query(appointmentsRef, orderByChild('studentId'), equalTo(userId))
  );
  const studentAppointments = snapshot2.exists() ? snapshot2.val() : {};

  //unpack values to combine into one object
  const combinedAppointments = { ...tutorAppointments, ...studentAppointments };
  const userAppointments = [];

  //get appointment objects from ids
  for (const appointmentId in combinedAppointments) {
    const appointment = await getAppointment(appointmentId);
    userAppointments.push(appointment);
  }

  return userAppointments;
}

export {writeUserData, writeAppointmentData, getCurrentUser, getUser};