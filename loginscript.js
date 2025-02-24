class User {
    constructor(id, first_name, last_name, email, password, store, avd, admin) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.store = store;
        this.admin = admin;
    }
}

let users = [];
let currentUser = [];

document.addEventListener("DOMContentLoaded", () => {
    try{
        users = JSON.parse(localStorage.getItem("users"));
        currentUser = JSON.parse(localStorage.getItem("currentUser"));
    } catch(error) {
        console.error(`Error ${error}`);
    }
});

function login() {
    let email = document.getElementById("login_email").value?.trim().toLowerCase() || "";
    let password = document.getElementById("login_password").value || "";
    let user = [];

    if(currentUser) {
        let logout = confirm("Logged in logout?");
        if(logout) {
            currentUser = [];
            localStorage.removeItem("currentUser");
        }
        return;
    }

    for(i = 0; i < users.length; i++) {
        if(users[i].email === email) {
            user = new User(users[i].id, users[i].first_name, users[i].last_name, users[i].email, users[i].password,
                users[i].store, users[i].avd, users[i].admin);
                if(user.password === password) {
                    try{
                        console.log("logged in");
                        currentUser.push(user);
                        localStorage.setItem("currentUser", JSON.stringify(currentUser));
                        return;
                    } catch(error) {
                        console.error("Error!" + error);
                        return;
                    }
                break;
            }
        }
    }
    console.log(Object.prototype.toString.call(user).slice(8, -1));
    if(!user) {
        console.log("User not found");
        return;
    }
    console.log("Wrong password");
}