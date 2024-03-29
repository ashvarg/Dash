"use strict";
/*
    Purpose: JS logic for the sprintLog.html file
    Date Modified: 17/10/2022
    Contributors: Arosh Heekenda, Ashwin George, Jamie Harrison, Dylan Redman
    Reviewer: Arosh Heenkenda
*/
//Create a sprint
function createSprint(){

    //Get references for dates and name
    let startDate = document.getElementById("startDate");
    let endDate = document.getElementById("endDate");
    let sprintName = document.getElementById("newSprintName");
    let today = new Date().toISOString().substr(0, 10); //Get a value for today's date

    //Set min date to be today's date
    startDate.min = today; 
    endDate.min = today;

    //Set default values for dates and names
    startDate.value = "yyyy-MM-dd";
    endDate.value = "yyyy-MM-dd";
    sprintName.value = "";

    //Make the form appear
    let sprintFormRef = document.getElementById("createSprintForm");
    sprintFormRef.classList.add("show");
}

//Close sprint form
function createSprintClose(){

    //Make the form hidden
    let sprintFormRef = document.getElementById("createSprintForm");
    sprintFormRef.classList.remove("show");
}


//Save sprint details
function saveSprintDetails(){

    //Load updated data
    loadlistOfSprints();

    //Get references for dates and names
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;
    let sprintName = document.getElementById("newSprintName").value;

    //If name is blank and if end date is before start date, alerts users
    if (sprintName=="" | endDate < startDate | endDate=="" | startDate==""){
        alert("Please ensure all fields are correct")
        return
    }

    //Ask user to confirm choices
    if (confirm('Are you sure you want these choices?')){

        //Create new sprint data dictionary
        //Status is 0, 1, or 2 started, in progress or complete
        let sprintData = {"name": sprintName, "start": startDate, "end": endDate, "notStarted": [], "inProgress": [], "complete":[], "status": 0, "burnHours":[], "cumHours":[]};

        //Push to listOfSprints list
        listOfSprints.push(sprintData);
        
        //Update local storage and close the form
        createSprintClose();
        saveListOfSprints();
        displaySprints();
    }
}

// Displays sprints in the sprintlog.html file 
function displaySprints(){

    //load sprints just in case
    loadlistOfSprints();

    let sprintTableRef = document.getElementById("sprintTable");

    let sprintTableOutput = `<tr>
                                <th>Name</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Status</th> 
                            </tr>`;

    for (let i=0; i<listOfSprints.length; i++){

        let status = "";
        //Not Started
        if (listOfSprints[i].status == 0){
            status = "Not Started";
        }
        //In Progress
        else if (listOfSprints[i].status == 1){
            status = "In Progress";
        } 
        //Completed
        else if (listOfSprints[i].status == 2){
            status = "Completed";
        }

        sprintTableOutput += `<tr <button onclick="sprintPage(${i})"></button>
                                <td>${listOfSprints[i].name}</td>
                                <td>${new Date(listOfSprints[i].start).toLocaleDateString()}</td>
                                <td>${new Date(listOfSprints[i].end).toLocaleDateString()}</td>
                                <td>${status}</td> 
                            </tr>`
    }

    sprintTableRef.innerHTML = sprintTableOutput;
}

// Loads sprints through local storage once page is loaded 
function onSprintLogLoad(){

    //Load data from local storage
    loadlistOfSprints();
    if (listOfSprints == null){
        listOfSprints = [];
        saveListOfSprints();
    }

    loadSprintIndex()
    if (sprintIndex == null){
        sprintIndex = {index: 0}
        saveSprintIndex();
    }

    //Display Sprints
    displaySprints();
}