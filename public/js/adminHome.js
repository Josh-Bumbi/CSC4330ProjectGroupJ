document.addEventListener("DOMContentLoaded", function () {
    // Test data for users
    const users = [
      { id: 1, name: "Alice", email: "alice@example.com", userType: "Student" },
      { id: 2, name: "Bob", email: "bob@example.com", userType: "Tutor" },
      { id: 3, name: "Carol", email: "carol@example.com", userType: "Student" },
    ];
  
    // Test data for appointments
    const appointments = [
      {
        id: 1,
        student: "Alice",
        tutor: "Bob",
        date: "2023-05-10",
        time: "10:00",
        status: "Pending",
      },
      {
        id: 2,
        student: "Carol",
        tutor: "Bob",
        date: "2023-05-11",
        time: "14:00",
        status: "Accepted",
      },
      {
        id: 3,
        student: "Alice",
        tutor: "Bob",
        date: "2023-05-12",
        time: "16:00",
        status: "Cancelled",
      },
    ];
  
    const userList = document.getElementById("userList");
    const appointmentList = document.getElementById("appointmentList");
  
    // Display test data for users
    users.forEach((user) => {
      const listItem = document.createElement("div");
      listItem.classList.add("list-group-item");
      listItem.textContent = `${user.name} (${user.userType}) - ${user.email}`;
      userList.appendChild(listItem);
    });
  
    // Display test data for appointments
    appointments.forEach((appointment) => {
      const listItem = document.createElement("div");
      listItem.classList.add("list-group-item");
      listItem.textContent = `${appointment.student} - ${appointment.tutor} - ${appointment.date} ${appointment.time} (${appointment.status})`;
      appointmentList.appendChild(listItem);
    });
  });