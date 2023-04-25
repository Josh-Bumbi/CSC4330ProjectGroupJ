import { logout } from "./services/authServices.js";

await logout();

window.location = "index.html";