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


//Display Not Started
function notStartedDisplay(){

    //Make necessary items disappear
    let toggleRef = document.getElementById("toggleButton");
    let chartRef = document.getElementById("theChart");
    let kanbanRef = document.getElementById("kanban");
    toggleRef.classList.remove("show");
    chartRef.classList.remove("show");
    kanbanRef.classList.remove("show");

    //Make Correct Stuff Appear
    let preDisplayRef = document.getElementById("notStartedCard");
    preDisplayRef.classList.add("show");

    //Display sprint status buttons
    sprintStatusButtons();
}


//Display In Progress
function inProgressDisplay(){

    //Display sprint status buttons
    sprintStatusButtons();
}


//Display Completed
function completedDisplay(){

    //Display sprint status buttons
    sprintStatusButtons();
}

//Displaying the sprint status buttons depending on what our sprint status is
function sprintStatusButtons(){

    //References to status text and button div
    let statusText = document.getElementById("statusText");
    let statusButton = document.getElementById("statusChange");

    //Not Started
    if (listOfSprints[sprintIndex.index]["status"] == 0){

        let ref = `<button type="button" onclick="startSprint(${sprintIndex.index})"> Start Sprint</button>`

        statusButton.innerHTML = ref;
        statusText.innerHTML = "Sprint Status: Not Started";
    }
    //Started
    else if (listOfSprints[sprintIndex.index]["status"] == 1){

        statusButton.innerHTML = `<button type="button" onclick="endSprint(${sprintIndex.index})"> End Sprint</button>`;
        statusText.innerHTML = "Sprint Status: In Progress";
    }
    //Completed
    else if (listOfSprints[sprintIndex.index]["status"] == 2){

        statusButton.innerHTML = "";
        statusText.innerHTML = "Sprint Status: Completed";
    }
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

    loadSprintIndex()
    if (sprintIndex == null){
        sprintIndex = {index: 0}
        saveSprintIndex();
    }
    
    if (listOfSprints[sprintIndex.index].status == 0){
        
        //Do Display Stuff For Not Started
        notStartedDisplay();
    }
    else if (listOfSprints[sprintIndex.index].status == 1){

        //Do Display Stuff For In Progress
        inProgressDisplay();
    }
    else if (listOfSprints[sprintIndex.index].status == 2){

        //Do Display Stuff For Complete
        completedDisplay();
    }
}

