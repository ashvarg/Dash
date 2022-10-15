"use strict";

//Create a teamMember
function createTeamMember(){
    //Make the form appear
    let name = document.getElementById("newMemberName");
    let email = document.getElementById("newMemberEmail");


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
    // console.log(listOfTeamMembers);
    //Get references for dates and names
    let name = document.getElementById("newMemberName").value;
    let email = document.getElementById("newMemberEmail").value;

    //If name is blank and if end date is before start date, alerts users
    if (name=="" | email==""){
        alert("Please ensure all fields are correct")
        return
    }

    //Ask user to confirm choices
    if (confirm('Are you sure you want these choices?')){

        //create teamMember object
        let teamMemberObject = new teamMember(name, email);
        //add to list of teamMembers
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

    let teamMemberTableOutput = `<tr>
                                <th>Name</th>
                                <th>Email</th>  
                                <th style="width:100px"></th>                                                              
                            </tr>`;

    for (let i=0; i<listOfTeamMembers.length; i++){
        let teamMember = listOfTeamMembers[i];
        teamMemberTableOutput += `<tr>
                                <td>${teamMember.name}</td>
                                <td>${teamMember.email}</td>
                                <td><button type="button" class="TeamMemberDetails" onclick="teamMemberDelete(${i})"> <i class="fa-solid fa-trash-can fa-xl"></i> </button></td>
                            </tr>`;
    }

    teamMemberTableRef.innerHTML = teamMemberTableOutput;
}
function teamMemberDelete(index){
    if (confirm('Are you sure you want to delete this team member?')){
        listOfTeamMembers.splice(index, 1);
        savelistOfTeamMembers();
        displayTeamMembers();
    }
}

function onTeamManagementLoad(){
    //load data from local storage

    loadlistOfTeamMembers();
    if (listOfTeamMembers == null){
        listOfTeamMembers = [];
        savelistOfTeamMembers()
    }

    displayTeamMembers();

}