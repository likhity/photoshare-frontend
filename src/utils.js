
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