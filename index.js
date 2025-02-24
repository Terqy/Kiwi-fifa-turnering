
let groups = 0;

let groupIdentification = [
    "A",
    "B",
    "C",
    "D"
    ];

let users = [];
let currentUser = [];

document.addEventListener("DOMContentLoaded", () => {
    try {
        users = JSON.parse(localStorage.getItem("users"));
        currentUser = JSON.parse(localStorage.getItem("currentUser"));
    } catch(error) {
        console.log("Error " + error);
    }
});

function generateGroups() {
    groups = users.length / 4;
    console.log(groups);
}