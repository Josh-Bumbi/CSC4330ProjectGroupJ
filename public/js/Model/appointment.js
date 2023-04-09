
class Appointment {
    constructor(tutor, student, startTime, endTime, description, appointmentId = null) {
        this.tutor = tutor;
        this.student = student;
        this.startTime = startTime;
        this.endTime = endTime;
        this.description = description;
        this.appointmentId = appointmentId;
    }
}



export {Appointment};