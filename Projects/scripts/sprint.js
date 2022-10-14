"use strict";

function toggleViewLabel(){
    
    //Get the inner html
    let toggleText = document.getElementById("toggleLabel");
    let notStarted = document.getElementById('notStarted')
    let started = document.getElementById('started')
    let completed = document.getElementById('completed')
    let chartBox = document.getElementById('theChart');
    loadlistOfSprints();

    //Switch the text value depending on what is there
    if (toggleText.textContent == "Kanban"){
        //Switch to Chart
        toggleText.innerHTML = "Chart";
        notStarted.classList.remove("show");
        started.classList.remove("show");
        completed.classList.remove("show");
        chartBox.classList.remove("hide");
    }
    else if(toggleText.textContent == "Chart"){
        //Switch to Kanban
        toggleText.innerHTML = "Kanban";
        notStarted.classList.add("show");
        started.classList.add("show");
        completed.classList.add("show");
        chartBox.classList.add("hide");
        //Display cards
        displayKanbanCards();
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
        //Status is 0, 1, or 2 started, in progress or complete
        let sprintData = {"name": sprintName, "start": startDate, "end": endDate, "notStarted": [], "inProgress": [], "complete":[], "status": 0};

        //Push to listOfSprints list
        listOfSprints.push(sprintData);
        
        //Update local storage and close the form
        createSprintClose();
        sprintStatusButtons();
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
    let sprintOptionsOutput = `<select class="sprintInput" type="text" id="sprints"  onchange="displaySprintLog()">
                                    <option value="" disabled>--Please choose a sprint--</option>`;

    //Go through and add sprint options
    for (let i=0; i<listOfSprints.length; i++){
        sprintOptionsOutput += `<option value=${i}>${listOfSprints[i]["name"]}</option>`;
    }

    //Change the output
    sprintOptionsOutput += `</select>`;
    sprintOptionsRef.innerHTML = sprintOptionsOutput;
    saveListOfSprints();
}


//Display function
function displaySprintLog(){

    let toggleText = document.getElementById("toggleLabel");
    if (toggleText.textContent == "Kanban"){
        displayKanbanCards();
    }
    else if (toggleText.textContent == "Chart"){
        console.log("Test");
    }

    //Start and End sprint buttons
    sprintStatusButtons();
}


//Displaying the sprint status buttons depending on what our sprint status is
function sprintStatusButtons(){

    //Reference to options list
    let sprintSelectRef = document.getElementById("sprints");
    if (sprintSelectRef.value == ""){
        return;
    }
    let sprintIndex = parseInt(sprintSelectRef.value) //Convert to integer

    //References to status text and button div
    let statusText = document.getElementById("statusText");
    let statusButton = document.getElementById("statusChange");

    //Not Started
    if (listOfSprints[sprintIndex]["status"] == 0){

        let ref = `<button type="button" onclick="startSprint(${sprintIndex})"> Start Sprint</button>`

        statusButton.innerHTML = ref;
        statusText.innerHTML = "Sprint Status: Not Started";
    }
    //Started
    else if (listOfSprints[sprintIndex]["status"] == 1){

        statusButton.innerHTML = `<button type="button" onclick="endSprint(${sprintIndex})"> End Sprint</button>`;
        statusText.innerHTML = "Sprint Status: In Progress";
    }
    //Completed
    else if (listOfSprints[sprintIndex]["status"] == 2){

        statusButton.innerHTML = "";
        statusText.innerHTML = "Sprint Status: Completed";
    }
}


function startSprint(index){
    
    //Update our status field
    listOfSprints[index]["status"] = 1;
    //Redisplay our button
    saveListOfSprints();
    sprintStatusButtons();
    displayKanbanCards();
}

function endSprint(index){
    
    //Update our status field
    listOfSprints[index]["status"] = 2;
    //Redisplay buttons
    saveListOfSprints();
    sprintStatusButtons();
    displayKanbanCards();
}

//Function to display relevant cards in kanban view
function displayKanbanCards(){

    let sprintSelectRef = document.getElementById("sprints");

    if (sprintSelectRef.value != ""){

        //Get sprint index
        let sprintIndex = parseInt(sprintSelectRef.value) //Convert to integer

        let notStartedRef = document.getElementById("notStarted");
        let notStartedOutput = `<h2> Tasks Not Started </h2>`;

        let startedRef = document.getElementById("started");
        let startedOutput = `<h2> Tasks Started </h2>`;

        let completedRef = document.getElementById("completed");
        let completedOutput = `<h2> Tasks Completed </h2>`;

        //Add cards to not started
        for (let i=0; i<listOfSprints[sprintIndex]["notStarted"].length; i++){

            if (listOfSprints[sprintIndex]["status"] == 0){

                notStartedOutput += `<div class="sprintCard"> 
                <div class="sprintCardName"><p>${listOfSprints[sprintIndex]["notStarted"][i]["card"]["_name"]}</p></div>
                <div class="sprintCardButtons">
                    <button type="button" onclick="removeFromSprint(${sprintIndex},${i})"> <i class="fa fa-trash"></i> </button> 
                    <button type="button" onclick="displayDetails(${sprintIndex},${i},0)"> <i class="fa fa-bars"></i> </button> 
                    <button type="button" onclick="moveToStarted(${sprintIndex},${i},'notStarted')"> <i class="fa fa-arrow-right"></i> </button> 
                </div>
            </div>`;
            }
            else{

                notStartedOutput += `<div class="sprintCard"> 
                <div class="sprintCardName"><p>${listOfSprints[sprintIndex]["notStarted"][i]["card"]["_name"]}</p></div>
                <div class="sprintCardButtons">
                    <button type="button" onclick="displayDetails(${sprintIndex},${i},0)"> <i class="fa fa-bars"></i> </button> 
                    <button type="button" onclick="moveToStarted(${sprintIndex},${i},'notStarted')"> <i class="fa fa-arrow-right"></i> </button> 
                </div>
            </div>`;
            }
        }
        notStartedRef.innerHTML = notStartedOutput;

        //Add cards to started
        for (let i=0; i<listOfSprints[sprintIndex]["inProgress"].length; i++){
            startedOutput += `<div class="sprintCard"> 
                <div class="sprintCardName"><p>${listOfSprints[sprintIndex]["inProgress"][i]["card"]["_name"]}</p></div>
                <div class="sprintCardButtons">
                    <button type="button" onclick="moveToNotStarted(${sprintIndex},${i})"> <i class="fa fa-arrow-left"></i> </button>  
                    <button type="button" onclick="displayDetails(${sprintIndex},${i},1)"> <i class="fa fa-bars"></i> </button> 
                    <button type="button" onclick="moveToComplete(${sprintIndex},${i})"> <i class="fa fa-arrow-right"></i> </button> 
                </div>
            </div>`;
        }
        startedRef.innerHTML = startedOutput;

        //Add cards to completed
        for (let i=0; i<listOfSprints[sprintIndex]["complete"].length; i++){
            completedOutput += `<div class="sprintCard"> 
                <div class="sprintCardName"><p>${listOfSprints[sprintIndex]["complete"][i]["card"]["_name"]}</p></div>
                <div class="sprintCardButtons">
                    <button type="button" onclick="moveToStarted(${sprintIndex},${i},'complete')"> <i class="fa fa-arrow-left"></i> </button>  
                    <button type="button" onclick="displayDetails(${sprintIndex},${i},2)"> <i class="fa fa-bars"></i> </button> 
                </div>
            </div>`;
        }
        completedRef.innerHTML = completedOutput;
    }
}


function removeFromSprint(sprintIndex, listIndex){
    
    let card = listOfSprints[sprintIndex]["notStarted"].pop(listIndex);
    listOfCards.push(card);

    saveListOfSprints();
    savelistOfCards();
    displayKanbanCards();
}

function moveToNotStarted(sprintIndex, listIndex){

    let card = listOfSprints[sprintIndex]["inProgress"].pop(listIndex);
    card["card"]["_status"] = "Not Started";
    listOfSprints[sprintIndex]["notStarted"].push(card);
    saveListOfSprints();
    displayKanbanCards();
}

function moveToStarted(sprintIndex, listIndex, status){

    if (status == "notStarted"){
        let card = listOfSprints[sprintIndex]["notStarted"].pop(listIndex);
        card["card"]["_status"] = "In Progress";
        listOfSprints[sprintIndex]["inProgress"].push(card);
    }
    else if (status == "complete"){
        let card = listOfSprints[sprintIndex]["complete"].pop(listIndex);
        card["card"]["_status"] = "In Progress";
        listOfSprints[sprintIndex]["inProgress"].push(card);
    }

    saveListOfSprints();
    displayKanbanCards();
}

function moveToComplete(sprintIndex, listIndex){

    let card = listOfSprints[sprintIndex]["inProgress"].pop(listIndex);
    card["card"]["_status"] = "Completed";
    listOfSprints[sprintIndex]["complete"].push(card);
    saveListOfSprints();
    displayKanbanCards();
}

function displayDetails(sprintIndex, listIndex, status){

    let displayRef = document.getElementById("modal_view");

    let card = NaN;

    if (status == 0){
        card = listOfSprints[sprintIndex]["notStarted"][listIndex]["card"];
    }
    else if (status == 1){
        card = listOfSprints[sprintIndex]["inProgress"][listIndex]["card"];
    }
    else if (status == 2){
        card = listOfSprints[sprintIndex]["complete"][listIndex]["card"];
    }

    let nameRef = document.getElementById("viewTaskName");
    let typeRef = document.getElementById("viewTaskType");
    let storyPointsRef = document.getElementById("viewStoryPoints");
    let tagRef = document.getElementById("viewTag");
    let priorityRef = document.getElementById("viewPriority");
    let assigneeRef = document.getElementById("viewAssignee");
    let descriptionRef = document.getElementById("viewDescription");
    let statusRef = document.getElementById("viewStatus");

    nameRef.innerHTML = card["_name"];
    typeRef.innerHTML = card["_type"];
    storyPointsRef.innerHTML = card["_storyPoints"];
    tagRef.innerHTML = card["_tag"];
    priorityRef.innerHTML = card["_priority"];
    assigneeRef.innerHTML = card["_assignee"];
    descriptionRef.innerHTML = card["_description"];
    statusRef.innerHTML = card["_status"];

    displayRef.classList.add("show");
}

function closeDetails(){

    let displayRef = document.getElementById("modal_view");
    displayRef.classList.remove("show");
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
    toggleViewLabel();
    sprintStatusButtons();
}

