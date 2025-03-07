let groupSize = 4;
let groups = [];
let groupIdentification = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G"
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
    createTables();
});

function createTables() {
    const groupTable = document.getElementById("groupTable");
    let groups = JSON.parse(localStorage.getItem("Groups"));

    if(!groups) {
        console.log("No groups");
        return;
    }

    for(i = 0; i < groups.length; i++) {      
        var groupCaption = groupTable.createCaption();
        groupCaption.innerHTML = `Group ${groups[i].groupId}`;
        var groupHeader = groupTable.insertRow(0);
    
        var cell1 = groupHeader.insertCell(0);
        var cell2 = groupHeader.insertCell(1);
        var cell3 = groupHeader.insertCell(2);
        var cell4 = groupHeader.insertCell(3);
        var cell5 = groupHeader.insertCell(4);
        var cell6 = groupHeader.insertCell(5);
        var cell7 = groupHeader.insertCell(6);
    
        cell1.innerHTML = "Navn";
        cell2.innerHTML = "Wins";
        cell3.innerHTML = "Draws";
        cell4.innerHTML = "Losses";
        cell5.innerHTML = "Goals for";
        cell6.innerHTML = "Goals against";
        cell7.innerHTML = "Points";

        const participants = Object.values(groups[i]).filter(item => item.id);
        console.log(participants.length);

        participants.forEach(participant => {
            let x = 0;
            var participantRow = groupTable.insertRow(groupTable.rows.length);

            var cell1 = participantRow.insertCell(0);
            var cell2 = participantRow.insertCell(1);
            var cell3 = participantRow.insertCell(2);
            var cell4 = participantRow.insertCell(3);
            var cell5 = participantRow.insertCell(4);
            var cell6 = participantRow.insertCell(5);
            var cell7 = participantRow.insertCell(6);

            cell1.innerHTML = participant.firstName;
            cell2.innerHTML = participant.wins;
            cell3.innerHTML = participant.draws;
            cell4.innerHTML = participant.losses;
            cell5.innerHTML = participant.goalsFor;
            cell6.innerHTML = participant.goalsAgainst;
            cell7.innerHTML = participant.points;
        })

    }
}

//funciton to generategroup tables
function generateGroups() {
    let tempUserArr = []
    if(users) {
        for(i = 0; i < users.length; i++) {
            if(users[i].inGroup) {
                continue;
            } else {
                try {
                    let user = {
                        id: users[i].id,
                        firstName: users[i].firstName,
                        email: users[i].email,
                        wins: 0,
                        draws: 0,
                        losses: 0,
                        goalsFor: 0,
                        goalsAgainst: 0,
                        points: 0
                    };
                    tempUserArr.push(user)
                    console.log("Added user to  tempArray");
                } catch(error) {
                    console.error("Error! " + error);
                }
            }
        }
    } else {
        console.log("No users registered");
        return;
    }

    let numberOfGroups = tempUserArr.length / 4;
    if(numberOfGroups < 1) {
        alert("not enough users registered");
        return;
    } else {
        let table = {};
        for(i = 0; i < numberOfGroups; i++) {
            console.log("Creating table");
            table = {
                groupId: groupIdentification[i]
            };

            for(j = 0; j < 4; j++) {
                let userIndexToAdd = Math.floor(Math.random() * tempUserArr.length);
                table[`Participant${j+1}`] = tempUserArr[userIndexToAdd];
                tempUserArr.splice(userIndexToAdd, 1);
            }
            groups.push(table);
        }
    }
    localStorage.setItem("Groups", JSON.stringify(groups));
    createTables();
}

function clearGroups() {
    localStorage.removeItem("Groups");
    console.log("Removed groups");
    createTables();
}