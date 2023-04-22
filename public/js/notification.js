
//regular notification with just text
function createTextNotification(text) {
    const notification = document.createElement('div');
    notification.classList.add('notification', 'text-notification', 'alert', 'alert-secondary');
    notification.textContent = text;
    return notification;
}


//notification for a tutor to accept an appointment
function createAcceptanceNotification(text) {
    const notification = document.createElement('div');
    notification.classList.add('notification', 'acceptance-notification', 'alert', 'alert-info', 'd-flex', 'flex-column', 'gap-3');

    const notificationText = document.createElement('p');
    notificationText.textContent = text;
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
    
    notification.appendChild(buttons);

    return notification;
}

//notification for a student to rate and review a tutor
function createRateAndReviewNotification(text) {
    const notification = document.createElement('div');
    notification.classList.add('notification', 'rate-review-notification', 'alert', 'alert-warning', 'd-flex', 'flex-column', 'gap-3', 'align-items-center');

    const notificationText = document.createElement('p');
    notificationText.textContent = text;
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

    return notification;
}

function displayNotifications() {
    const notificationsContainer = document.getElementById('notifications');

    //Test notifs
    const notificationsData = [
        { type: 'text', text: 'Test Tutor Accepted your appointment' },
        { type: 'acceptance', text: 'New appointment request from Test Tutor.' },
        { type: 'text', text: 'You have a new message.' },
        { type: 'acceptance', text: 'New appointment request from Jane Smith.' },
        { type: 'rateAndReview', text: 'Please rate and review your appointment with Tutor Name.' }
    ];

    notificationsData.forEach(notificationData => {
        let notification;
        if (notificationData.type === 'text') {
            notification = createTextNotification(notificationData.text);
        } else if (notificationData.type === 'acceptance') {
            notification = createAcceptanceNotification(notificationData.text);
        } else if (notificationData.type === 'rateAndReview') {
            notification = createRateAndReviewNotification(notificationData.text);
        }

        notificationsContainer.appendChild(notification);
    });
}

document.addEventListener('DOMContentLoaded', displayNotifications);