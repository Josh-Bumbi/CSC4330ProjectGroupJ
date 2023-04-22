import {writeAppointmentData} from '../services/databaseServices.js';


const UserType = {
    TUTOR: 'tutor',
    STUDENT: 'student',
    ADMIN: 'admin'
};

function isAppointmentConflict(existingAppointments, newAppointment) {
    for (const appointment of existingAppointments) {
      if (
        (newAppointment.startTime >= appointment.startTime && newAppointment.startTime < appointment.endTime) ||
        (newAppointment.endTime > appointment.startTime && newAppointment.endTime <= appointment.endTime) ||
        (newAppointment.startTime <= appointment.startTime && newAppointment.endTime >= appointment.endTime)
      ) {
        return true;
      }
    }
    return false;
}


class User {
    constructor(userId, name, email, userType, grade = null, major = null) {
      this.userId = userId;
      this.name = name;
      this.email = email;
      this.grade = grade;
      this.userType = userType;
      this.major = major;
    }
}


class Student extends User {
    constructor(userId, name, email, grade, major = null) {
      super(userId, name, email, UserType.STUDENT, grade, major);
      this.scheduledAppointments = [];
    }
  
    async addAppointment(appointment) {
      if (
        isAppointmentConflict(this.scheduledAppointments, appointment) ||
        isAppointmentConflict(appointment.tutor.scheduledAppointments, appointment)
      ) {
        console.error('Appointment conflict detected. Appointment not scheduled.');
        return;
      }
  
      this.scheduledAppointments.push(appointment);
      appointment.tutor.scheduledAppointments.push(appointment);
      await writeAppointmentData(appointment);
    }
  }
  
  class Tutor extends User {
    constructor(userId, name, email, grade, major = null) {
      super(userId, name, email, UserType.TUTOR, grade, major);
      this.scheduledAppointments = [];
    }
  
    async addAppointment(appointment) {
      if (
        isAppointmentConflict(this.scheduledAppointments, appointment) ||
        isAppointmentConflict(appointment.student.scheduledAppointments, appointment)
      ) {
        console.error('Appointment conflict detected. Appointment not scheduled.');
        return;
      }
  
      this.scheduledAppointments.push(appointment);
      appointment.student.scheduledAppointments.push(appointment);
      await writeAppointmentData(appointment);
    }
  }

  class Admin extends User {
    constructor(userId, name, email) {
      super(userId, name, email, UserType.ADMIN);
    }
  }
  


export {User, UserType, Student, Tutor, Admin};

