const AppointmentStatus = {
    PENDING: 'pending',
    ACCEPTED: 'accepted',
    DECLINED: 'declined',
    COMPLETE: 'complete'
};

class Appointment {
    constructor(tutor, student, startTime, endTime, description, status, appointmentId = null) {
        this.tutor = tutor;
        this.student = student;
        this.startTime = startTime;
        this.endTime = endTime;
        this.description = description;
        this.appointmentId = appointmentId;
        this.status = status;
    }
}



export {Appointment};