import { deleteAppointment, getCurrentUser, getAllUsers, getAllAppointments, getUser } from "./services/databaseServices.js";
const currentUser = await getCurrentUser();
if(currentUser.userType != "admin"){
    window.location.href = 'index.html';
}


function addAppointmentToTable(date, tutor, student, topic, id) {
    const table = document.getElementById("sessionTable");
    const row = table.insertRow(-1);

    row.insertCell(0).innerHTML = date;
    row.insertCell(1).innerHTML = tutor;
    row.insertCell(2).innerHTML = student;
    row.insertCell(3).innerHTML = topic;

    // Add a dropdown to the Actions cell
    const actionsCell = row.insertCell(4);
    actionsCell.classList.add("dropdown");
    actionsCell.innerHTML = `
        <button class="btn btn-danger" type="button" id="actionsDropdown">
            Delete
        </button>
    `;

    actionsCell.addEventListener("click", async function () {
        actionsCell.classList.toggle("show");
        await deleteAppointment(id);
        window.location.reload();
    
    });

}


const allUsers = await getAllUsers();
const allAppointments = await getAllAppointments();

for (const user in allUsers) {
    if (allUsers[user].userType == "tutor") {
        const dropdown = document.getElementById("tutorSelect");
        const option = document.createElement("option");
        option.text = allUsers[user].name + " (" + allUsers[user].email + ")";
        option.value = allUsers[user].userId;
        dropdown.add(option);
    }

    if (allUsers[user].userType == "student") {
        const dropdown = document.getElementById("studentSelect");
        const option = document.createElement("option");
        option.text = allUsers[user].name + " (" + allUsers[user].email + ")";
        option.value = allUsers[user].userId;
        dropdown.add(option);
    }
}


for (const appointment in allAppointments) {
    const date = new Date(allAppointments[appointment].startTime).toLocaleString();

    const tutorObj = await getUser(allAppointments[appointment].tutor);
    const studentObj = await getUser(allAppointments[appointment].student);
    const tutor = tutorObj.name + " (" + tutorObj.email + ")";
    const student = studentObj.name + " (" + studentObj.email + ")";
    const topic = allAppointments[appointment].description;

    addAppointmentToTable(date, tutor, student, topic, allAppointments[appointment].appointmentId);
}


document.getElementById("createAppointmentBtn").addEventListener("click", async function () {
    const tutorId = document.getElementById("tutorSelect").value;
    const studentId = document.getElementById("studentSelect").value;
    window.location.assign("scheduleAppointment.html?id=" + tutorId + "&studID=" + studentId);

});