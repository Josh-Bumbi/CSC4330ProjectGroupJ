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
    } else {
        document.getElementById("home").setAttribute("href", "tutorHome.html");
    }

    const profileButton = document.getElementById('profileDropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (user) {
        // Update the profile button text
        // profileButton.textContent = user.name;

        // Update the dropdown menu
        dropdownMenu.innerHTML = `
            <li><a class="dropdown-item" href="#">Manage Profile</a></li>
            <li><a class="dropdown-item" href="logout.html">Log Out</a></li>
        `;
    } else {
        // User not logged in, keep the original dropdown menu
        dropdownMenu.innerHTML = `
            <li><a class="dropdown-item" href="#">Log In</a></li>
            <li><a class="dropdown-item" href="#">Sign Up</a></li>
        `;
    }
});