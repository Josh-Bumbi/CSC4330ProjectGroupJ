document.addEventListener('DOMContentLoaded', function () {
    // Time slot selection logic
    const timeSlots = document.querySelectorAll('.time-slot');
    timeSlots.forEach(slot => {
        slot.addEventListener('click', function () {
            // Deselect all other time slots
            timeSlots.forEach(s => s.classList.remove('selected'));
            // Select the clicked time slot
            slot.classList.add('selected');
        });
    });


    const scheduleButton = document.getElementById('scheduleAppointment');
    scheduleButton.addEventListener('click', function () {
        const selectedSlot = document.querySelector('.time-slot.selected');

        //Check if a time slot is selected
        if (selectedSlot) {
            // Get the selected time
            const selectedTime = selectedSlot.textContent;
            console.log('Selected time:', selectedTime);

            // Send the selected time to the database

        } else {
            alert('Please select a time slot.');
        }
    });
});