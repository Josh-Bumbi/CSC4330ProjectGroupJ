import { updateUserData, getCurrentUser } from "./services/databaseServices.js";

const user = await getCurrentUser();


document.getElementById('name').value = user.name;
document.getElementById('major').value = user.major;
document.getElementById('grade').value = user.grade;




document.getElementById('modfyProfile').addEventListener('click', async function () {
    const name = document.getElementById('name').value;
    const major = document.getElementById('major').value;
    const grade = document.getElementById('grade').value;
    
    await updateUserData(user.userId, {
        name: name,
        major: major,
        grade: grade
    });

    window.location.reload();

}); 