const first_name = document.getElementById("first_name");
const last_name = document.getElementById("last_name");
const email = document.getElementById("email");
const store = document.getElementById("store");
const avd = document.getElementById("avd");
const register_button = document.getElementById("register")

class User {
    constructor(id, first_name, last_name, email, password, store, avd) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.store = store;
    }
}

let users = JSON.parse(localStorage.getItem("users"))?.map(user=> new User(user.id, user.firstName, user.lastName, 
    user.email,user.password, user.store, user.avd) )||[];

function register_user() {
    let id = users.length + 1;
    let firstName = document.getElementById("first_name")?.value.trim() || "";
    let lastName = document.getElementById("last_name")?.value.trim() || "";
    let emailValue = document.getElementById("email")?.value.trim().toLowerCase() || "";
    let storeValue = document.getElementById("store")?.value.trim() || "";
    let avdValue = document.getElementById("avd")?.value.trim() || "";
    
    if(!firstName || !lastName || !emailValue || !storeValue || !avdValue) {
        alert("Enter all fields");
        return;
    }

    let emailExists = users.some(user => user.email.toLowerCase() === emailValue);
    if(emailExists) {
        alert("Email already registered");
        return;
    }

    let password = "";

    for(i = 0; i < 4; i++) {
        let number = Math.floor(Math.random() * 10);
        password = password + number;
    }

    let newUser = new User(id, firstName, lastName, emailValue, password, storeValue, avdValue);
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    console.log("Added user");
    console.log(users);

    make_json();
}

function make_json() {
    console.log("Saving to JSON for easy access and testing");
    var users_stringified = users.forEach(user => {
        JSON.stringify(user);
    });

    console.log(users_stringified);
}