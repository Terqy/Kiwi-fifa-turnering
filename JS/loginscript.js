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
                if(users[i].password === password) {
                    let user = {
                        id: users[i].id,
                        firstName: users[i].firstName,
                        lastName: users[i].lastName,
                        email: users[i].email
                    };

                    if(user) {
                        try {
                            localStorage.setItem("currentUser", JSON.stringify(user));
                            return;
                        } catch(error) {
                            console.error("Error! " + error);
                            return;
                        }
                    } else {
                        console.log("Could not login????");
                    }
                break;
            }
        } else {
            alert(`No user with Email: ${email} registered.`);
            return;
        }
    }
    console.log(Object.prototype.toString.call(user).slice(8, -1));
    if(!user) {
        console.log("User not found");
        return;
    }
    console.log("Wrong password");
}