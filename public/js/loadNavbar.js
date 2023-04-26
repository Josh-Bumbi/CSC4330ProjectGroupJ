import { getCurrentUser } from './services/databaseServices.js';


document.addEventListener('DOMContentLoaded', async function () {


    // Load the navbar
    const navbarResponse = await fetch('navbar.html');
    const navbarData = await navbarResponse.text();
    document.getElementById('navbar-placeholder').innerHTML = navbarData;




    //Get the current user, if null, no user logged in
    const user = await getCurrentUser();

    if (user == null) {
        location.href = "index.html";
    }

    if (user.userType == "student") {
        document.getElementById("home").setAttribute("href", "studentHome.html");
    } if (user.userType == "tutor"){
        document.getElementById("home").setAttribute("href", "tutorHome.html");
    } else {
        document.getElementById("home").setAttribute("href", "adminHome.html");
    }

    const profileButton = document.getElementById('profileDropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (user) {
        // Update the profile button text
        // profileButton.textContent = user.name;

        // Update the dropdown menu

        if(user.userType != "admin"){
            dropdownMenu.innerHTML = `
            <li><a class="dropdown-item" href="modifyProfile.html">Manage Profile</a></li>
            <li><a class="dropdown-item" href="logout.html">Log Out</a></li>
        `;
        } else {
            //change dropdwonMenu from dropdown to <button>
            dropdownMenu.innerHTML = '<li><a class="dropdown-item" href="logout.html">Log Out</a></li>'
            //remove notifcation button
            document.getElementById("notif").remove();
        }
        
        
    } else {
        // User not logged in, keep the original dropdown menu
        dropdownMenu.innerHTML = `
            <li><a class="dropdown-item" href="#">Log In</a></li>
            <li><a class="dropdown-item" href="#">Sign Up</a></li>
        `;
    }
});