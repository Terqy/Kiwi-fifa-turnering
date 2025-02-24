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

//check if localstorage has "users" and make it an array of user objects if users is undefined or null make it empty.
document.addEventListener("DOMContentLoaded", () => {
    try {
        users = JSON.parse(localStorage.getItem("users"));
    } catch(error) {
        console.error(error);
    }
}) 

//register the user
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

    let newUser = new User(id, firstName, lastName, emailValue, password, storeValue, avdValue, false);
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    console.log("Added user");
    console.log(users);

    make_json();
}

//just for testing fuck this loool
function make_json() {
    console.log("Saving to JSON for easy access and testing");
    var users_stringified = JSON.stringify(users);
    if(users_stringified) {
        console.log(users_stringified);
        console.log("Saving json file....");
        var download = confirm("Download json? Yes or no!");
        if(download) {
            const blob = new Blob([users_stringified], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = "JSONtest.txt";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } else {
            console.log("wont download json.-.---");
        }
    } 
}

function clear_users() {
    localStorage.clear();
    users = [];
    currentUser = [];
    console.log("Cleared everything MF");
}