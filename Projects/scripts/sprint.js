"use strict";

function toggleViewLabel(){
    
    //Get the inner html
    let toggleText = document.getElementById("toggleLabel");

    //Switch the text value depending on what is there
    if (toggleText.textContent == "Kanban"){
        //Switch to Chart
        toggleText.innerHTML = "Chart";
    }
    else if(toggleText.textContent == "Chart"){
        //Switch to Kanban
        toggleText.innerHTML = "Kanban";
    }
}


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
        let sprintData = {"name": sprintName, "start": startDate, "end": endDate, "notStarted": [], "inProgress": [], "complete":[]};

        //Push to listOfSprints list
        listOfSprints.push(sprintData);
        
        //Update local storage and close the form
        createSprintClose();
        saveListOfSprints();
        updateSprintList();
        saveListOfSprints();
    }
}


//Update the drop down list of sprints
function updateSprintList(){

    //Load updated data, if null do nothing
    loadlistOfSprints();
    if (listOfSprints == null){
        return
    }

    //Get reference and output
    let sprintOptionsRef = document.getElementById("sprintOptions");
    let sprintOptionsOutput = `<select class="sprintInput" type="text" id="sprints">
                                    <option value="">--Please choose a sprint--</option>`;

    //Go through and add sprint options
    for (let i=0; i<listOfSprints.length; i++){
        sprintOptionsOutput += `<option value=${i}>${listOfSprints[i]["name"]}</option>`;
    }

    //Change the output
    sprintOptionsOutput += `</select>`;
    sprintOptionsRef.innerHTML = sprintOptionsOutput;
    saveListOfSprints();
}


//On loading page we check and update the local storage as necessary
function onLoadSprintLog(){
    loadlistOfSprints();
    if (listOfSprints == null){
        listOfSprints = [];
        saveListOfSprints();
    }
    loadlistOfCards()
    if (listOfCards == null){
        listOfCards = [];
        savelistOfCards()
    }
    updateSprintList();
}