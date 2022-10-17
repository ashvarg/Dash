"use strict";

//Create a teamMember
function createTeamMember(){
    //Make the form appear
    let name = document.getElementById("newMemberName");
    let email = document.getElementById("newMemberEmail");
    let mobile = document.getElementById("newMemberMobile");

    name.value = "";
    email.value = "";
    mobile.value = "";

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
        loadMemberIndex();
        let teamIndex = memberIndex.index;
        //add to list of teamMembers
        let memberItem = {"index": teamIndex, "member": teamMemberObject}
        listOfTeamMembers.push(memberItem);

        memberIndex.index++

        //update local storage and close the form
        createTeamMemberClose();
        savelistOfTeamMembers();
        saveMemberIndex();
        displayTeamMembers();
    }
}

function displayTeamMembers(){
    //load teamMembers just in case
    loadlistOfTeamMembers();

    let startDate = document.getElementById("startDateDisplay").value;
    let endDate = document.getElementById("endDateDisplay").value;

    //if startDate and endDate are not null
    if (startDate != "" && endDate != ""){
        //check start date is not after end date
        if (startDate > endDate){
            alert("Start Date cannot be after End Date!");
            return
        }
    }

    let teamMemberTableRef = document.getElementById("teamMemberTable");

    let teamMemberTableOutput = `<tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile Number</th>
                                <th>Hours Logged Between Dates</th> 
                                <th> </th>
                            </tr>`;

    for (let i=0; i<listOfTeamMembers.length; i++){
        let teamMember = listOfTeamMembers[i].member;
        //get team Member Worklog
        let workLog = teamMember.workLog;
        //determine hours logged between dates
        let hoursLogged = 0;
        for (let j=0; j<workLog.length; j++){
            let workLogItem = workLog[j];
            let workLogDate = workLogItem.date;
            let workLogHours = workLogItem.hours;
            //check if worklog date is between start and end date
            if (workLogDate >= startDate && workLogDate <= endDate){
                hoursLogged += workLogHours;
            }

        }

        teamMemberTableOutput += `<tr>
                                <td>${teamMember.name}</td>
                                <td>${teamMember.email}</td>
                                <td>${teamMember.mobile}</td>
                                <td>${hoursLogged}</td>
                                <td><button type="button" class="deleteTeamMember" onclick="teamMemberDelete(${i})"> <i class="fa-solid fa-trash-can fa-xl"></i> </button></td>
                            </tr>`;
    }

    teamMemberTableRef.innerHTML = teamMemberTableOutput;
}


function teamMemberDelete(index){
    if (confirm('Are you sure you want to delete this team member?')){

        for (let i=0; i < listOfTeamMembers.length; i++){

            if (listOfTeamMembers[i].index == index){

                listOfTeamMembers.splice(i, 1);
                savelistOfTeamMembers();
                displayTeamMembers();
                break
            }
        }
    }
}

function onTeamManagementLoad(){
    //load data from local storage

    loadlistOfTeamMembers();
    if (listOfTeamMembers == null){
        listOfTeamMembers = [];
        savelistOfTeamMembers()
    }

    loadMemberIndex();
    if (memberIndex == null){
        memberIndex = {index: 0}
        saveMemberIndex();
    }

    displayTeamMembers();
}