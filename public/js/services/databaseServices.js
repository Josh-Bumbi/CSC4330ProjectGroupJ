import app from "./firebaseConfig.js";
import {getDatabase, ref, set, push, get, orderByChild, equalTo, query, update} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
import {getCurrentUserId} from "./authServices.js";
import {User, UserType, Admin, Student, Tutor} from "../model/user.js";
import {Appointment} from "../model/appointment.js";
import {Notification} from "../model/notification.js";
import { Review } from "../model/review.js";
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
    startTime: appointment.startTime.toLocaleString(),
    endTime: appointment.endTime.toLocaleString(),
    description: appointment.description,
    status: "pending" //new appointments will always have a pending status
  });

  return appointmentId;
}

async function updateAppointmentData(appointmentId, updatedData) {
  if (!appointmentId) {
    throw new Error('Appointment ID is required');
  }

  const appointmentRef = ref(db, `appointments/${appointmentId}`);

  // Convert Date objects to ISO strings for storage
  if (updatedData.startTime) {
    updatedData.startTime = updatedData.startTime.toISOString();
  }
  if (updatedData.endTime) {
    updatedData.endTime = updatedData.endTime.toISOString();
  }

  await update(appointmentRef, updatedData);
}


async function updateNotificationData(notifId, updatedData) {
  if (!notifId) {
    throw new Error('Notification ID is required');
  }

  const notifRef = ref(db, `notifications/${notifId}`);

  await update(notifRef, updatedData);
}




async function getCurrentUser() {
  var userId = await getCurrentUserId();
  if (userId == null) {
    return null;
  }
  return getUser(userId);
}

async function writeNotificationData(notification) {
  const notifRef = push(ref(db, 'notifications'));
  const notifId = notifRef.key;

  await set(notifRef, {
    recipient: notification.recipient,
    appointmentId: notification.appointmentId,
    type: notification.type,
    status: notification.status,
    message: notification.message
  });
  return notifId;
}

async function deleteNotification(notifId) {
  const notifRef = ref(db, `notifications/${notifId}`);
  return set(notifRef, null);
}


async function writeReviewData(review) {
  const reviewRef = push(ref(db, 'reviews'));
  const reviewId = reviewRef.key;

  await set(reviewRef, {
    reviewer: review.reviewerId,
    reviewed: review.reviewedId,
    message: review.message,
    stars: review.stars
  });

  return reviewId;
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
    const tutor = appointmentData.tutorId;
    const student = appointmentData.studentId;
    const startTime = new Date(appointmentData.startTime);
    const endTime = new Date(appointmentData.endTime);
    const description = appointmentData.description;
    const status = appointmentData.status;

    return new Appointment(tutor, student, startTime, endTime, description, status, appointmentId);
  } else {
    throw new Error('Appointment not found');
  }
}



async function getNotification(notifId) {
  const notifRef = ref(db, 'notifications/' + notifId);
  const snapshot = await get(notifRef);

  if (snapshot.exists()) {
    const notifData = snapshot.val();
    const appointmentId = notifData.appointmentId;
    const message = notifData.message;
    const recipient = notifData.recipient;
    const status = notifData.status;
    const type = notifData.type;

    return new Notification(appointmentId, recipient, message, type, status, notifId);
  } else {
    throw new Error('Notification not found');
  }
}



async function getNotifications(userId) {
  const notificationsRef = ref(db, 'notifications');
  const snapshot = await get(
    query(notificationsRef, orderByChild('recipient'), equalTo(userId))
  );
  const userNotifications = [];
  for (const notifId in snapshot.val()) {
    const notif = await getNotification(notifId);
    userNotifications.push(notif);
  }
  return userNotifications;
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

  //sort appointments by start time
  userAppointments.sort((a, b) => {
    return a.startTime - b.startTime;
  });
  return userAppointments;
}

async function getTutors() {
  const tutors = [];
  const userRef = ref(db, 'users');

  const snapshot = await get(
    query(userRef, orderByChild('userType'), equalTo(UserType.TUTOR))
  )

  if (snapshot.exists()) {
    const userData = snapshot.val();
    console.log(userData)
    for (const userId in userData) {
      const tutor = await getUser(userId);
      tutors.push(tutor);
    
    }
  }

  return tutors;
}

async function getAllReviews(userId) {
  const reviews = [];
  const reviewRef = ref(db, 'reviews');

  const snapshot = await get(
    query(reviewRef, orderByChild('reviewed'), equalTo(userId))
  );

  if (snapshot.exists()) {
    const reviewData = snapshot.val();
    console.log(reviewData);
    for (const reviewId in reviewData) {
      const reviewInfo = reviewData[reviewId];
      const review = new Review(reviewInfo.reviewer, reviewInfo.reviewed, reviewInfo.message, reviewInfo.stars, reviewId);
      reviews.push(review);
    }
  }

  return reviews;
}


export { getAllReviews, deleteNotification, writeUserData, writeAppointmentData, writeNotificationData, getNotifications, getCurrentUser, getUser, getTutors, getAppointment, updateAppointmentData, updateNotificationData, writeReviewData};