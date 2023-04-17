import axios from "axios";

export function getUser() {
    const user = JSON.parse(localStorage.getItem("PHOTOSHARE_USER"));
    let tokenNotExpired = false;
    
    if (user) {
        tokenNotExpired = Date.now() < user.expiration;
    }

    if (tokenNotExpired) {
        return user;
    } else {
        localStorage.removeItem("PHOTOSHARE_USER");
        return null;
    }
}

export async function logOut() {
    const response = await axios.get("/api/logout");
    localStorage.removeItem("PHOTOSHARE_USER");
    window.location = "/";
}