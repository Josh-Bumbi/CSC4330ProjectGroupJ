class Notification {
    constructor(appointmentId, recipient, message, type, status) {
        this.appointmentId = appointmentId;
        this.recipient = recipient;
        this.message = message;
        this.type = type;
        this.status = status;
    }
}

export {Notification};