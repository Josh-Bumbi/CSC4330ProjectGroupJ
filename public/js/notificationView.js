import { deleteNotification, writeReviewData, getCurrentUser, getNotifications, getAppointment, getUser, updateAppointmentData, updateNotificationData, writeNotificationData } from "./services/databaseServices.js";
import { Notification } from "./model/notification.js";
import { Review} from "./model/review.js";

var user;

async function createNotificationInfo(user, startDate, startHour, startMinute, endHour, endMinute) {

    const info = document.createElement('div');
    info.classList.add('notification-info', 'mb-2');

    info.innerHTML = `
        <strong>${user.name}</strong><br>
        Date: ${startDate.toDateString()}<br>
        Time: ${startHour}:${startMinute} - ${endHour}:${endMinute}<br>
    `;
    return info;
}

async function createTextNotification(notificationData, appointment) {
    const notification = document.createElement('div');
    notification.classList.add('notification', 'text-notification', 'alert', 'alert-secondary', 'd-flex', 'flex-column', 'gap-3');

     //Get student and appointment info
     const student = await getUser(appointment.student);
     var endDate = new Date(appointment.endTime);
     var endHour = endDate.getHours();
     var endMinute = endDate.getMinutes();
     if (endMinute < 10) {
         endMinute = "0" + endMinute;
     }
 
     var startDate = new Date(appointment.startTime);
     var startHour = startDate.getHours();
     var startMinute = startDate.getMinutes();
     if (startMinute < 10) {
         startMinute = "0" + startMinute;
     }
 
     const notificationInfo = await createNotificationInfo(student, startDate, startHour, startMinute, endHour, endMinute);
     notification.appendChild(notificationInfo);


    const notificationText = document.createElement('p');
    notificationText.textContent = notificationData.message;
    notification.appendChild(notificationText);

    return notification;
}


async function createAcceptanceNotification(notificationData, appointment) {
    const notification = document.createElement('div');
    notification.classList.add('notification', 'acceptance-notification', 'alert', 'alert-info', 'd-flex', 'flex-column', 'gap-3');


    //Get student and appointment info
    const student = await getUser(appointment.student);
    var endDate = new Date(appointment.endTime);
    var endHour = endDate.getHours();
    var endMinute = endDate.getMinutes();
    if (endMinute < 10) {
        endMinute = "0" + endMinute;
    }

    var startDate = new Date(appointment.startTime);
    var startHour = startDate.getHours();
    var startMinute = startDate.getMinutes();
    if (startMinute < 10) {
        startMinute = "0" + startMinute;
    }



    const notificationInfo = await createNotificationInfo(student, startDate, startHour, startMinute, endHour, endMinute);
    notification.appendChild(notificationInfo);

    const notificationText = document.createElement('p');
    notificationText.textContent = notificationData.message;
    notification.appendChild(notificationText);

    const messageInput = document.createElement('input');
    messageInput.setAttribute('type', 'text');
    messageInput.setAttribute('placeholder', 'Message to student');
    messageInput.classList.add('form-control');
    notification.appendChild(messageInput);

    const buttons = document.createElement('div');
    buttons.classList.add('d-flex', 'gap-2');
    
    const acceptButton = document.createElement('button');
    acceptButton.textContent = 'Accept Appointment';
    acceptButton.classList.add('btn', 'btn-primary');
    buttons.appendChild(acceptButton);

    const declineButton = document.createElement('button');
    declineButton.textContent = 'Decline Appointment';
    declineButton.classList.add('btn', 'btn-danger');
    buttons.appendChild(declineButton);



    acceptButton.addEventListener('click', async () => {
        const message = messageInput.value;
        if (message === '') {
            alert('Please enter a message');
            return;
        }

        //need to update appointment status to accepted and create a text notification for the student
        await updateAppointmentData(appointment.appointmentId, { status: 'accepted' });
        await updateNotificationData(notificationData.id, { status: 'accepted' });

        var messageText = `${user.name} has accepted your appointment on ${startDate.toDateString()} at ${startHour}:${startMinute} - ${endHour}:${endMinute}.  Message: ${message}.`;

        var notif = new Notification(appointment.appointmentId, "lFHl9aurtdXoY8Ta0n0tQ3hzDEq1", messageText, 'text', 'unread');

  
        await writeNotificationData(notif);

        var messageText = `Please leave a review for your tutor, ${user.name}, for your ${startDate.toDateString()} appointment.`;
        notif = new Notification(appointment.appointmentId, "lFHl9aurtdXoY8Ta0n0tQ3hzDEq1", messageText, 'review', 'unread');
        await writeNotificationData(notif);
        location.reload();

    });
    
    declineButton.addEventListener('click', async () => {
        const message = messageInput.value;
        if (message === '') {
            alert('Please enter a message');
            return;
        }
        console.log(`Decline Appointment clicked for appointment ${appointment.student}`);
        await updateAppointmentData(appointment.appointmentId, { status: 'declined' });
        await updateNotificationData(notificationData.id, { status: 'declined' });

        
        var messageText = `${user.name} has declined your appointment on ${startDate.toDateString()} at ${startHour}:${startMinute} - ${endHour}:${endMinute}.  Message: ${message}.`;

        var notif = new Notification(appointment.appointmentId, "lFHl9aurtdXoY8Ta0n0tQ3hzDEq1", messageText, 'text', 'unread');
  
        await writeNotificationData(notif);

        location.reload();
    });


    if (notificationData.status === 'accepted') {
        acceptButton.disabled = true;
        declineButton.disabled = true;
        notification.classList.add('accepted');
        notificationText.textContent += ' (Accepted)';
    } else if (notificationData.status === 'declined') {
        acceptButton.disabled = true;
        declineButton.disabled = true;
        notification.classList.add('declined');
        notificationText.textContent += ' (Declined)';
    }
    



    
    notification.appendChild(buttons);

    return notification;
}

//notification for a student to rate and review a tutor
async function createRateAndReviewNotification(notificationData, appointment) {
    const notification = document.createElement('div');
    notification.classList.add('notification', 'rate-review-notification', 'alert', 'alert-warning', 'd-flex', 'flex-column', 'gap-3', 'align-items-center');
    
    //Get student and appointment info
    const student = await getUser(appointment.student);
    var endDate = new Date(appointment.endTime);
    var endHour = endDate.getHours();
    var endMinute = endDate.getMinutes();
    if (endMinute < 10) {
        endMinute = "0" + endMinute;
    }

    var startDate = new Date(appointment.startTime);
    var startHour = startDate.getHours();
    var startMinute = startDate.getMinutes();
    if (startMinute < 10) {
        startMinute = "0" + startMinute;
    }



    const notificationInfo = await createNotificationInfo(student, startDate, startHour, startMinute, endHour, endMinute);
    notification.appendChild(notificationInfo);

    const notificationText = document.createElement('p');
    notificationText.textContent = notificationData.message;
    notification.appendChild(notificationText);

    const rating = document.createElement('div');
    rating.classList.add('rating', 'd-flex', 'justify-content-center');
    rating.innerHTML = `
        <input type="radio" name="rating" id="rating5"><label for="rating5">&#9733;</label>
        <input type="radio" name="rating" id="rating4"><label for="rating4">&#9733;</label>
        <input type="radio" name="rating" id="rating3"><label for="rating3">&#9733;</label>
        <input type="radio" name="rating" id="rating2"><label for="rating2">&#9733;</label>
        <input type="radio" name="rating" id="rating1"><label for="rating1">&#9733;</label>
    `;
    notification.appendChild(rating);

    const reviewInput = document.createElement('input');
    reviewInput.setAttribute('type', 'text');
    reviewInput.setAttribute('placeholder', 'Write your review');
    reviewInput.classList.add('form-control');
    notification.appendChild(reviewInput);

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit review';
    submitButton.classList.add('btn', 'btn-primary');
    notification.appendChild(submitButton);


    // Inside createRateAndReviewNotification
    submitButton.addEventListener('click', async () => {
        const selectedRating = rating.querySelector('input:checked');
        const numberOfStars = selectedRating ? parseInt(selectedRating.id.replace('rating', '')) : 0;
        const reviewText = reviewInput.value;
        
        console.log(`Submit review clicked for appointment ${appointment.appointmentId}`);
        console.log(`Stars: ${numberOfStars}`);
        console.log(`Review: ${reviewText}`);

        // create and submit review
        const review = new Review(appointment.student, appointment.tutor, reviewText, numberOfStars);
        await writeReviewData(review);

        //delete this notification
        await deleteNotification(notificationData.id);

        location.reload();

        //create text notification for tutor

    });




    return notification;
}

async function displayNotifications() {
    const notificationsContainer = document.getElementById('notifications');

    user = await getCurrentUser();

    //Get notifications from database
    const notificationsData = await getNotifications(user.userId);



    notificationsData.forEach(async notificationData => {
        let notification;
        const appointment = await getAppointment(notificationData.appointmentId);
        if (notificationData.type === 'text') {
            notification = await createTextNotification(notificationData, appointment);
        } else if (notificationData.type === 'accept') {
            notification = await createAcceptanceNotification(notificationData, appointment);
        } else if (notificationData.type === 'review') {
            notification = await createRateAndReviewNotification(notificationData, appointment);
        }

        notificationsContainer.appendChild(notification);
    });
}

document.addEventListener('DOMContentLoaded', displayNotifications);