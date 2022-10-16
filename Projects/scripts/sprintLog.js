"use strict";

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
    if (sprintName=="" | endDate < startDate){
        alert("Please ensure all fields are correct")
        return
    }

    //Ask user to confirm choices
    if (confirm('Are you sure you want these choices?')){

        //Create new sprint data dictionary
        //Status is 0, 1, or 2 started, in progress or complete
        let sprintData = {"name": sprintName, "start": startDate, "end": endDate, "notStarted": [], "inProgress": [], "complete":[], "status": 0, "loggedHours":[]};

        //Push to listOfSprints list
        listOfSprints.push(sprintData);
        
        //Update local storage and close the form
        createSprintClose();
        saveListOfSprints();
        displaySprints();
    }
}


function displaySprints(){

    //load sprints just in case
    loadlistOfSprints();

    let sprintTableRef = document.getElementById("sprintTable");

    let sprintTableOutput = `<tr>
                                <th>Name</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Status</th> 
                                <th>Details</th>
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

        sprintTableOutput += `<tr>
                                <td>${listOfSprints[i].name}</td>
                                <td>${new Date(listOfSprints[i].start).toLocaleDateString()}</td>
                                <td>${new Date(listOfSprints[i].end).toLocaleDateString()}</td>
                                <td>${status}</td> 
                                <td><button type="button class="sprintDetails" onclick="sprintPage(${i})"> Details </button></td>
                            </tr>`
    }

    sprintTableRef.innerHTML = sprintTableOutput;
}


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