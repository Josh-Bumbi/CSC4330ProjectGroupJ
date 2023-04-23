class Notification {
    constructor(appointmentId, recipient, message, type, status, id=null) {
        this.appointmentId = appointmentId;
        this.recipient = recipient;
        this.message = message;
        this.type = type;
        this.status = status;
        this.id = id;
    }
}

export {Notification};