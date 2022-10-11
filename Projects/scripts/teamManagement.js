"use strict";

//Create a teamMember
function createTeamMember(){
    //Make the form appear
    let name = document.getElementById("newMemberName");
    let email = document.getElementById("newMemberEmail");
    let mobile = document.getElementById("newMemberMobile");


    //make the form appear
    let teamMemberFormRef = document.getElementById("createTeamMemberForm");
    teamMemberFormRef.classList.add("show");
}

//Close teamMember form
function createTeamMemberClose(){
        //Make the form hidden
        let teamMemberFormRef = document.getElementById("createTeamMemberForm");
        teamMemberFormRef.classList.remove("show");
}

//save teamMember details
function saveTeamMemberDetails(){
    //Load updated data
    loadlistOfTeamMembers();

    //Get references for dates and names
    let name = document.getElementById("newMemberName").value;
    let email = document.getElementById("newMemberEmail").value;
    let mobile = document.getElementById("newMemberMobile").value;

    //If name is blank and if end date is before start date, alerts users
    if (name=="" | email=="" | mobile==""){
        alert("Please ensure all fields are correct")
        return
    }

    //Ask user to confirm choices
    if (confirm('Are you sure you want these choices?')){

        //create teamMember object
        let teamMemberObject = new teamMember(name, email, mobile);
        console.log(teamMemberObject)
        //Push to listOfTeamMembers list
        listOfTeamMembers.push(teamMemberObject);

        //update local storage and close the form
        createTeamMemberClose();
        savelistOfTeamMembers();
        displayTeamMembers();
    }
}

function displayTeamMembers(){
    //load teamMembers just in case
    loadlistOfTeamMembers();

    let teamMemberTableRef = document.getElementById("teamMemberTable");

    let sprintTableOutput = `<tr>
                                <th>Name</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Status</th> 
                                <th>Details</th>
                            </tr>`;

    for (let i=0; i<listOfTeamMembers.length; i++){
        let teamMember = listOfTeamMembers[i];
        sprintTableOutput += `<tr>
                                <td>${teamMember.name}</td>
                                <td>${teamMember.email}</td>
                                <td>${teamMember.mobile}</td>
                                <td>${teamMember.status}</td>
                                <td><button onclick="viewTeamMemberDetails(${i})">View</button></td>
                            </tr>`;
    }

    teamMemberTableRef.innerHTML = sprintTableOutput;
}

function onTeamManagementLoad(){
    //load data from local storage
    loadlistOfTeamMembers();
    if (listOfTeamMembers == null){
        listOfTeamMembers = [];
        saveListOfTeamMembers()
    }
    displayTeamMembers();

}