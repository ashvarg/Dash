"use strict";

//Toggle Label Logic
function toggleViewLabel(){
    
    //Get the inner html
    let toggleText = document.getElementById("toggleLabel");
    let kanban = document.getElementById('kanban');
    let chartBox = document.getElementById('theChart');
    loadlistOfSprints();

    //Switch the text value depending on what is there
    if (toggleText.textContent == "Kanban"){
        //Switch to Chart
        toggleText.innerHTML = "Chart";
        kanban.classList.remove("show");
        chartBox.classList.add("show");
    }
    else if(toggleText.textContent == "Chart"){
        //Switch to Kanban
        toggleText.innerHTML = "Kanban";
        kanban.classList.add("show");
        chartBox.classList.remove("show");
        
        //Relevant display properties
        if (listOfSprints[sprintIndex.index]['status'] == 1){
            inProgressDisplay();
        }
        else{
            completedDisplay();
        }
    }
}



//Start Sprint
function startSprint(){
    
    //Update our status field
    listOfSprints[sprintIndex.index]["status"] = 1;
    //Redisplay our button
    saveListOfSprints();
    sprintStatusButtons();
    inProgressDisplay();
}

//End Sprint
function endSprint(){
    
    //Update our status field
    listOfSprints[sprintIndex.index]["status"] = 2;
    //Redisplay buttons
    saveListOfSprints();
    sprintStatusButtons();
    completedDisplay();
}


//Moving tasks between sprint and product backlog
//Move to sprint log
function addToSprint(cardIndex){

    let card = listOfCards.splice(cardIndex, 1)[0]

    listOfSprints[sprintIndex.index]["notStarted"].push(card)
    saveListOfSprints();
    savelistOfCards();
    notStartedDisplay();
}

//Remove from sprint log
function removeFromSprint(listIndex){
    
    let card = listOfSprints[sprintIndex.index]["notStarted"].splice(listIndex, 1)[0];
    listOfCards.push(card);

    saveListOfSprints();
    savelistOfCards();
    notStartedDisplay();
}



//Displaying Details for cards in product backlog
function displayPLDetails(index){

    let displayRef = document.getElementById("modal_view");
    let card = listOfCards[index]["card"];

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

//Displaying details for cards in sprint log
function displaySLDetails(listIndex, status){

    let displayRef = document.getElementById("modal_view");

    let card = NaN;

    if (status == 0){
        card = listOfSprints[sprintIndex.index]["notStarted"][listIndex]["card"];
    }
    else if (status == 1){
        card = listOfSprints[sprintIndex.index]["inProgress"][listIndex]["card"];
    }
    else if (status == 2){
        card = listOfSprints[sprintIndex.index]["complete"][listIndex]["card"];
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

    //Display all cards in backlog
    let backlogRef = document.getElementById("productLog");
    let backOutput = `<h4> Product Backlog </h4>`
    
    for (let i=0; i<listOfCards.length; i++){

        backOutput += `<div class="sprintCard"> 
                <div class="sprintCardName"><p>${listOfCards[i]["card"]["_name"]}</p></div>
                <div class="sprintCardButtons">
                    <button type="button" onclick="displayPLDetails(${i})"> <i class="fa fa-bars"></i> </button> 
                    <button type="button" onclick="addToSprint(${i})"> <i class="fa fa-arrow-right"></i> </button> 
                </div>
            </div>`
    }
    backlogRef.innerHTML = backOutput;

    //Display all cards in sprint log
    let sprintlogRef = document.getElementById("sprintLog");
    let sprintOutput = `<h4> Sprint Log </h4>`;
    for (let i=0; i<listOfSprints[sprintIndex.index]["notStarted"].length; i++){

        sprintOutput += `<div class="sprintCard"> 
                <div class="sprintCardName"><p>${listOfSprints[sprintIndex.index]["notStarted"][i]["card"]["_name"]}</p></div>
                <div class="sprintCardButtons">
                    <button type="button" onclick="removeFromSprint(${i})"> <i class="fa fa-arrow-left"></i> </button>  
                    <button type="button" onclick="displaySLDetails(${i}, ${0})"> <i class="fa fa-bars"></i> </button> 
                </div>
            </div>`;
    }
    sprintlogRef.innerHTML = sprintOutput;
}


//Display In Progress
function inProgressDisplay(){

    //Make necessary items disappear
    let preDisplayRef = document.getElementById("notStartedCard");
    preDisplayRef.classList.remove("show");
    let chartRef = document.getElementById("theChart");
    chartRef.classList.remove("show");

    //Make Correct Stuff Appear
    let toggleRef = document.getElementById("toggleButton");
    let kanbanRef = document.getElementById("kanban");
    toggleRef.classList.add("show");
    kanbanRef.classList.add("show");

    //Display sprint status buttons
    sprintStatusButtons();

    //Make it easier to access sprint index
    let index = sprintIndex.index;

    //References and output for each card
    let notStartedRef = document.getElementById("notStarted");
    let notStartedOutput = `<h2> Tasks Not Started </h2>`;

    let startedRef = document.getElementById("started");
    let startedOutput = `<h2> Tasks Started </h2>`;

    let completedRef = document.getElementById("completed");
    let completedOutput = `<h2> Tasks Completed </h2>`;

    //Add cards to not started
    for (let i=0; i<listOfSprints[index]["notStarted"].length; i++){

        notStartedOutput += `<div class="sprintCard"> 
        <div class="sprintCardName"><p>${listOfSprints[index]["notStarted"][i]["card"]["_name"]}</p></div>
        <div class="sprintCardButtons">
            <button type="button" onclick="displaySLDetails(${i}, ${0})"> <i class="fa fa-bars"></i> </button> 
            <button type="button" onclick="moveToStarted(${i},${0})"> <i class="fa fa-arrow-right"></i> </button> 
        </div>
    </div>`;
    }
    notStartedRef.innerHTML = notStartedOutput;

    //Add cards to started
    for (let i=0; i<listOfSprints[index]["inProgress"].length; i++){
        startedOutput += `<div class="sprintCard"> 
            <div class="sprintCardName"><p>${listOfSprints[index]["inProgress"][i]["card"]["_name"]}</p></div>
            <div class="sprintCardButtons">
                <button type="button" onclick="moveToNotStarted(${i})"> <i class="fa fa-arrow-left"></i> </button>  
                <button type="button" onclick="displaySLDetails(${i}, ${1})"> <i class="fa fa-bars"></i> </button> 
                <button type="button" onclick="moveToComplete(${i})"> <i class="fa fa-arrow-right"></i> </button> 
            </div>
        </div>`;
    }
    startedRef.innerHTML = startedOutput;

    //Add cards to completed
    for (let i=0; i<listOfSprints[index]["complete"].length; i++){
        completedOutput += `<div class="sprintCard"> 
            <div class="sprintCardName"><p>${listOfSprints[index]["complete"][i]["card"]["_name"]}</p></div>
            <div class="sprintCardButtons">
                <button type="button" onclick="moveToStarted(${i}, ${2})"> <i class="fa fa-arrow-left"></i> </button>  
                <button type="button" onclick="displaySLDetails(${i}, ${2})"> <i class="fa fa-bars"></i> </button> 
            </div>
        </div>`;
    }
    completedRef.innerHTML = completedOutput;
}


//Display Completed
function completedDisplay(){

    //Make necessary items disappear
    let preDisplayRef = document.getElementById("notStartedCard");
    preDisplayRef.classList.remove("show");
    let chartRef = document.getElementById("theChart");
    chartRef.classList.remove("show");

    //Make Correct Stuff Appear
    let toggleRef = document.getElementById("toggleButton");
    let kanbanRef = document.getElementById("kanban");
    toggleRef.classList.add("show");
    kanbanRef.classList.add("show");

    //Display sprint status buttons
    sprintStatusButtons();

    //Make it easier to access sprint index
    let index = sprintIndex.index;

    //References and output for each card
    let notStartedRef = document.getElementById("notStarted");
    let notStartedOutput = `<h2> Tasks Not Started </h2>`;

    let startedRef = document.getElementById("started");
    let startedOutput = `<h2> Tasks Started </h2>`;

    let completedRef = document.getElementById("completed");
    let completedOutput = `<h2> Tasks Completed </h2>`;

    //Add cards to not started
    for (let i=0; i<listOfSprints[index]["notStarted"].length; i++){

        notStartedOutput += `<div class="sprintCard"> 
        <div class="sprintCardName"><p>${listOfSprints[index]["notStarted"][i]["card"]["_name"]}</p></div>
        <div class="sprintCardButtons">
            <button type="button" onclick="displaySLDetails(${i}, ${0})"> <i class="fa fa-bars"></i> </button> 
        </div>
    </div>`;
    }
    notStartedRef.innerHTML = notStartedOutput;

    //Add cards to started
    for (let i=0; i<listOfSprints[index]["inProgress"].length; i++){
        startedOutput += `<div class="sprintCard"> 
            <div class="sprintCardName"><p>${listOfSprints[index]["inProgress"][i]["card"]["_name"]}</p></div>
            <div class="sprintCardButtons">  
                <button type="button" onclick="displaySLDetails(${i}, ${1})"> <i class="fa fa-bars"></i> </button> 
            </div>
        </div>`;
    }
    startedRef.innerHTML = startedOutput;

    //Add cards to completed
    for (let i=0; i<listOfSprints[index]["complete"].length; i++){
        completedOutput += `<div class="sprintCard"> 
            <div class="sprintCardName"><p>${listOfSprints[index]["complete"][i]["card"]["_name"]}</p></div>
            <div class="sprintCardButtons"> 
                <button type="button" onclick="displaySLDetails(${i}, ${2})"> <i class="fa fa-bars"></i> </button> 
            </div>
        </div>`;
    }
    completedRef.innerHTML = completedOutput;
}


//Displaying the sprint status buttons depending on what our sprint status is
function sprintStatusButtons(){

    //References to status text and button div
    let statusText = document.getElementById("statusText");
    let statusButton = document.getElementById("statusChange");

    //Not Started
    if (listOfSprints[sprintIndex.index]["status"] == 0){

        let ref = `<button type="button" onclick="startSprint()"> Start Sprint</button>`

        statusButton.innerHTML = ref;
        statusText.innerHTML = "Sprint Status: Not Started";
    }
    //Started
    else if (listOfSprints[sprintIndex.index]["status"] == 1){

        statusButton.innerHTML = `<button type="button" onclick="endSprint()"> End Sprint</button>`;
        statusText.innerHTML = "Sprint Status: In Progress";
    }
    //Completed
    else if (listOfSprints[sprintIndex.index]["status"] == 2){

        statusButton.innerHTML = "";
        statusText.innerHTML = "Sprint Status: Completed";
    }
}



//Moving Tasks Between Not Started, In Progress, Completed
function moveToNotStarted(listIndex){

    let card = listOfSprints[sprintIndex.index]["inProgress"].splice(listIndex, 1)[0];
    card["card"]["_status"] = "Not Started";
    listOfSprints[sprintIndex.index]["notStarted"].push(card);
    saveListOfSprints();
    inProgressDisplay();
}

function moveToStarted(listIndex, status){

    if (status == 0){
        let card = listOfSprints[sprintIndex.index]["notStarted"].splice(listIndex, 1)[0];
        card["card"]["_status"] = "In Progress";
        listOfSprints[sprintIndex.index]["inProgress"].push(card);
    }
    else if (status == 2){
        let card = listOfSprints[sprintIndex.index]["complete"].splice(listIndex, 1)[0];
        card["card"]["_status"] = "In Progress";
        listOfSprints[sprintIndex.index]["inProgress"].push(card);
    }

    saveListOfSprints();
    inProgressDisplay();
}

function moveToComplete(listIndex){

    let card = listOfSprints[sprintIndex.index]["inProgress"].splice(listIndex, 1)[0];
    card["card"]["_status"] = "Completed";
    listOfSprints[sprintIndex.index]["complete"].push(card);
    saveListOfSprints();
    inProgressDisplay();
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
