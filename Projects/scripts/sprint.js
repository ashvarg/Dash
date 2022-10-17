/*
    Purpose: JS logic for the sprint.html file
    Date Modified: 17/10/2022
    Contributors: Arosh Heekenda, Ashwin George, Jamie Harrison, Dylan Redman
    Reviewer: Arosh Heenkenda
*/
"use strict";
//Toggle Label Logic
function toggleViewLabel(){
    /**
     * Toggles the view label button

     */

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
        changeChart();
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
    /**
        * Starts the sprint
     */
    
    //Update our status field
    listOfSprints[sprintIndex.index]["status"] = 1;
    //Redisplay our button
    saveListOfSprints();
    sprintStatusButtons();
    inProgressDisplay();
}

//End Sprint
function endSprint(){
    /**
     * Ends the sprint
     */
    
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
    /**
     * Adds a card to the sprint log
     */

    let card = listOfCards.splice(cardIndex, 1)[0]

    listOfSprints[sprintIndex.index]["notStarted"].push(card)
    saveListOfSprints();
    savelistOfCards();
    notStartedDisplay();
}

//Remove from sprint log
function removeFromSprint(listIndex){
    /**
     * Removes a card from the sprint log
     */
    
    let card = listOfSprints[sprintIndex.index]["notStarted"].splice(listIndex, 1)[0];
    listOfCards.push(card);

    saveListOfSprints();
    savelistOfCards();
    notStartedDisplay();
}



//Displaying Details for cards in product backlog
function displayPLDetails(index){
    /**
     * Displays the details of a card in the product backlog
     * @param {*} index - The index of the card in the product backlog
     */

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


    // Changing text colour
    if (card["_priority"] == "Low"){
        priorityRef.style.color = "lightgreen";
    }
    else if (card["_priority"] == "Medium"){
        priorityRef.style.color = "orange";
    }
    else if (card["_priority"] == "High"){
        priorityRef.style.color = "red";
    }

    if (card["_status"] == "Completed"){
        statusRef.style.color = "lightgreen";
    }
    else if (card["_status"] == "In Progress"){
        statusRef.style.color = "orange";
    }
    else if (card["_status"] == "Not Started"){
        statusRef.style.color = "red";
    }

    nameRef.innerHTML = card["_name"];
    typeRef.innerHTML = card["_type"];
    storyPointsRef.innerHTML = card["_storyPoints"];
    tagRef.innerHTML = card["_tag"];
    priorityRef.innerHTML = card["_priority"];
    descriptionRef.innerHTML = card["_description"];
    statusRef.innerHTML = card["_status"];

    let member = parseInt(card["_assignee"]) //Convert to number
    for (let i=0; i < listOfTeamMembers.length; i++){

        if (listOfTeamMembers[i].index == member){
            assigneeRef.innerHTML = listOfTeamMembers[i].member.name;
            break;
        }
    }

    displayRef.classList.add("show");
}

//Displaying details for cards in sprint log
function displaySLDetails(listIndex, status){
    /**
     * Displays the details of a card in the sprint log
     * @param {*} ListIndex - The index of the card in the sprint log
     * @param {*} status - The status of the sprint (0= not started) 1 = in progress, 2 = completed)
     */

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

    // Changing text colour
    if (card["_priority"] == "Low"){
        priorityRef.style.color = "lightgreen";
    }
    else if (card["_priority"] == "Medium"){
        priorityRef.style.color = "orange";
    }
    else if (card["_priority"] == "High"){
        priorityRef.style.color = "red";
    }

    if (card["_status"] == "Completed"){
        statusRef.style.color = "lightgreen";
    }
    else if (card["_status"] == "In Progress"){
        statusRef.style.color = "orange";
    }
    else if (card["_status"] == "Not Started"){
        statusRef.style.color = "red";
    }

    nameRef.innerHTML = card["_name"];
    typeRef.innerHTML = card["_type"];
    storyPointsRef.innerHTML = card["_storyPoints"];
    tagRef.innerHTML = card["_tag"];
    priorityRef.innerHTML = card["_priority"];
    descriptionRef.innerHTML = card["_description"];
    statusRef.innerHTML = card["_status"];

    let member = parseInt(card["_assignee"]) //Convert to number
    for (let i=0; i < listOfTeamMembers.length; i++){

        if (listOfTeamMembers[i].index == member){
            assigneeRef.innerHTML = listOfTeamMembers[i].member.name;
            break;
        }
    }

    displayRef.classList.add("show");
}

function closeDetails(){
    /**
     * Closes the details of a card
     */

    let displayRef = document.getElementById("modal_view");
    displayRef.classList.remove("show");
}


//Display Not Started
function notStartedDisplay(){
    /**
     * Displays the cards in the not started section of the sprint log
     */

    //Make necessary items disappear
    let toggleRef = document.getElementById("toggleButton");
    let chartRef = document.getElementById("theChart");
    let kanbanRef = document.getElementById("kanban");
    toggleRef.classList.remove("show");
    toggleRef.classList.remove("inProgress");
    chartRef.classList.remove("show");
    kanbanRef.classList.remove("show");

    //Make Correct Stuff Appear
    let preDisplayRef = document.getElementById("notStartedCard");
    preDisplayRef.classList.add("show");

    //Display sprint status buttons
    sprintStatusButtons();

    //Display all cards in backlog
    let backlogRef = document.getElementById("productLog");
    let backOutput = `<h4 class="productBacklogHeader"> Product Backlog </h4>`
    
    for (let i=0; i<listOfCards.length; i++){

        backOutput += `<div class="sprintCard"> 
                <div class="sprintCardName">
                <button title="Edit Task" type="button" onclick="editCardPL(${i})" class="editButton"> <i class="fa-solid fa-pen-to-square"></i> </button>
                    ${listOfCards[i]["card"]["_name"]}
                <button title="View Task" type="button" onclick="displayPLDetails(${i})" class="detailsButton"> <i class="fa fa-bars"></i> </button> 
                </div>
                <div class="sprintCardButtons">
                    <button title="Add to Sprint" type="button" onclick="addToSprint(${i})" class="rightButton"> <i class="fa fa-arrow-right"></i> </button> 
                </div>
            </div>`
    }
    backlogRef.innerHTML = backOutput;

    //Display all cards in sprint log
    let sprintlogRef = document.getElementById("sprintLog");
    let sprintOutput = `<h4 class="sprintBacklogHeader"> Sprint Backlog </h4>`;
    for (let i=0; i<listOfSprints[sprintIndex.index]["notStarted"].length; i++){

        sprintOutput += `<div class="sprintCard"> 
                <div class="sprintCardName">
                <button title="Edit Task" type="button" onclick="editCardSL(${i}, ${0})" class="editButton"> <i class="fa-solid fa-pen-to-square"></i> </button>
                    ${listOfSprints[sprintIndex.index]["notStarted"][i]["card"]["_name"]}
                <button title="View Task" type="button" onclick="displaySLDetails(${i}, ${0})" class="detailsButton"> <i class="fa fa-bars"></i> </button> 
                </div>
                <div class="sprintCardButtons">
                    <button title="Remove from Sprint" type="button" onclick="removeFromSprint(${i})" class="leftButton"> <i class="fa fa-arrow-left"></i> </button>  
                </div>
            </div>`;
    }
    sprintlogRef.innerHTML = sprintOutput;
}


//Display In Progress
function inProgressDisplay(){
    /**
     * Displays the cards in the in progress section of the sprint log
     */

    //Make necessary items disappear
    let preDisplayRef = document.getElementById("notStartedCard");
    preDisplayRef.classList.remove("show");
    let chartRef = document.getElementById("theChart");
    chartRef.classList.remove("show");

    //Make Correct Stuff Appear
    let toggleRef = document.getElementById("toggleButton");
    let kanbanRef = document.getElementById("kanban");
    toggleRef.classList.add("show");
    toggleRef.classList.add("inProgress");
    kanbanRef.classList.add("show");

    //Display sprint status buttons
    sprintStatusButtons();

    //Make it easier to access sprint index
    let index = sprintIndex.index;

    //References and output for each card
    let notStartedRef = document.getElementById("notStarted");
    let notStartedOutput = `<h4 class="notStartedHeader"> Tasks Not Started </h4>`;

    let startedRef = document.getElementById("started");
    let startedOutput = `<h4 class="startedHeader"> Tasks Started </h4>`;

    let completedRef = document.getElementById("completed");
    let completedOutput = `<h4 class="completedHeader"> Tasks Completed </h4>`

    //Add cards to not started
    for (let i=0; i<listOfSprints[index]["notStarted"].length; i++){

        notStartedOutput += `<div class="sprintCard"> 
        <div class="sprintCardName">
            ${listOfSprints[index]["notStarted"][i]["card"]["_name"]}
        </div>
        <div class="sprintCardButtons">
            <button title="Edit Task" type="button" onclick="editCardSL(${i}, ${0})" class="editButton"> <i class="fa-solid fa-pen-to-square"></i> </button>
            <button title="View Task" type="button" onclick="displaySLDetails(${i}, ${0})" class="detailsButton"> <i class="fa fa-bars"></i> </button> 
            <button title="Change Status to In Progress" type="button" onclick="moveToStarted(${i},${0})" class="rightButton"> <i class="fa fa-arrow-right"></i> </button> 
        </div>
    </div>`;
    }
    notStartedRef.innerHTML = notStartedOutput;

    //Add cards to started
    for (let i=0; i<listOfSprints[index]["inProgress"].length; i++){
        startedOutput += `<div class="sprintCard"> 
            <div class="sprintCardName">
                ${listOfSprints[index]["inProgress"][i]["card"]["_name"]}
            </div>
            <div class="sprintCardButtons">
                <button title="Change Status to Not Started" type="button" onclick="moveToNotStarted(${i})" class="leftButton"> <i class="fa fa-arrow-left"></i> </button> 
                <button title="Edit Task" type="button" onclick="editCardSL(${i}, ${1})" class="editButton"> <i class="fa-solid fa-pen-to-square"></i> </button> 
                <button title="Log Time" type="button" onclick="logHoursOpen(${i})" class="timeButton"> <i class="fa-solid fa-clock"></i> </button>
                <button title="View Task" type="button" onclick="displaySLDetails(${i}, ${1})" class="detailsButton"> <i class="fa fa-bars"></i> </button> 
                <button title="Change Status to Completed" type="button" onclick="moveToComplete(${i})" class="rightButton"> <i class="fa fa-arrow-right"></i> </button> 
            </div>
        </div>`;
    }
    startedRef.innerHTML = startedOutput;

    //Add cards to completed
    for (let i=0; i<listOfSprints[index]["complete"].length; i++){
        completedOutput += `<div class="sprintCard"> 
            <div class="sprintCardName">
                ${listOfSprints[index]["complete"][i]["card"]["_name"]}
            </div>
            <div class="sprintCardButtons">
                <button title="Change Status to In Progress" type="button" onclick="moveToStarted(${i}, ${2})" class="leftButton"> <i class="fa fa-arrow-left"></i> </button>  
                <button title="Edit Task" type="button" onclick="editCardSL(${i}, ${2})" class="editButton"> <i class="fa-solid fa-pen-to-square"></i> </button>
                <button title="View Task" type="button" onclick="displaySLDetails(${i}, ${2})" class="detailsButton"> <i class="fa fa-bars"></i> </button> 
            </div>
        </div>`;
    }
    completedRef.innerHTML = completedOutput;
}


//Display Completed
function completedDisplay(){
    /**
     * Displays the cards in the completed section of the sprint log
     */

    //Make necessary items disappear
    let preDisplayRef = document.getElementById("notStartedCard");
    preDisplayRef.classList.remove("show");
    let chartRef = document.getElementById("theChart");
    chartRef.classList.remove("show");

    //Make Correct Stuff Appear
    let toggleRef = document.getElementById("toggleButton");
    let kanbanRef = document.getElementById("kanban");
    toggleRef.classList.add("show");
    toggleRef.classList.remove("inProgress");
    kanbanRef.classList.add("show");

    //Display sprint status buttons
    sprintStatusButtons();

    //Make it easier to access sprint index
    let index = sprintIndex.index;

    //References and output for each card
    let notStartedRef = document.getElementById("notStarted");
    let notStartedOutput = `<h4 class="notStartedHeader"> Tasks Not Started </h4>`;

    let startedRef = document.getElementById("started");
    let startedOutput = `<h4 class="startedHeader"> Tasks Started </h4>`;

    let completedRef = document.getElementById("completed");
    let completedOutput = `<h4 class="completedHeader"> Tasks Completed </h4>`
    //Add cards to not started
    for (let i=0; i<listOfSprints[index]["notStarted"].length; i++){

        notStartedOutput += `<div class="sprintCard"> 
        <div class="sprintCardName">
            ${listOfSprints[index]["notStarted"][i]["card"]["_name"]}
        </div>
        <div class="sprintCardButtons">
            <button title="Edit Task" type="button" onclick="editCardSL(${i}, ${0})" class="editButton"> <i class="fa-solid fa-pen-to-square"></i> </button>   
            <button title="View Task" type="button" onclick="displaySLDetails(${i}, ${0})" class="detailsButton"> <i class="fa fa-bars"></i> </button> 
        </div>
    </div>`;
    }
    notStartedRef.innerHTML = notStartedOutput;

    //Add cards to started
    for (let i=0; i<listOfSprints[index]["inProgress"].length; i++){
        startedOutput += `<div class="sprintCard"> 
            <div class="sprintCardName">
                ${listOfSprints[index]["inProgress"][i]["card"]["_name"]}
            </div>
            <div class="sprintCardButtons">  
                <button title="Edit Task" type="button" onclick="editCardSL(${i}, ${1})" class="editButton"> <i class="fa-solid fa-pen-to-square"></i> </button> 
                <button title="View Task" type="button" onclick="displaySLDetails(${i}, ${1})" class="detailsButton"> <i class="fa fa-bars"></i> </button>
            </div>
        </div>`;
    }
    startedRef.innerHTML = startedOutput;

    //Add cards to completed
    for (let i=0; i<listOfSprints[index]["complete"].length; i++){
        completedOutput += `<div class="sprintCard"> 
            <div class="sprintCardName">
                ${listOfSprints[index]["complete"][i]["card"]["_name"]}
            </div>
            <div class="sprintCardButtons"> 
                <button title="Edit Task" type="button" onclick="editCardSL(${i}, ${2})" class="editButton"> <i class="fa-solid fa-pen-to-square"></i> </button>            
                <button title="View Task" type="button" onclick="displaySLDetails(${i}, ${2})" class="detailsButton"> <i class="fa fa-bars"></i> </button> 
            </div>
        </div>`;
    }
    completedRef.innerHTML = completedOutput;
}


//Displaying the sprint status buttons depending on what our sprint status is
function sprintStatusButtons() {
    /**
     * Displays the sprint status buttons depending on the status of the sprint
     */

    //References to status text and button div
    let statusText = document.getElementById("statusText");
    let statusButton = document.getElementById("statusChange");

    //Not Started
    if (listOfSprints[sprintIndex.index]["status"] == 0) {

        let ref = `<button type="button" class="startSprintButton" onclick="startSprint()"> Start Sprint</button>`

        statusButton.innerHTML = ref;
        statusText.innerHTML = `<h4 class="notStartText"> Sprint Status: Not Started </h4>`
        ;
    }
    //Started
    else if (listOfSprints[sprintIndex.index]["status"] == 1) {

        statusButton.innerHTML = `<button type="button" class="endSprintButton" onclick="endSprint()"> End Sprint</button>`;
        statusText.innerHTML = `<h4 class="progressText"> Sprint Status: In Progress </h4>`;
    }
    //Completed
    else if (listOfSprints[sprintIndex.index]["status"] == 2) {

        statusButton.innerHTML = "";
        statusText.innerHTML = `<h4 class="completedText"> Sprint Status: Completed </h4>`;
    }
}


function logHoursOpen(index){
    /**
     * Opens the log hours modal
     * @param {*} index - index of the card in the sprint log
     */

    let logDate = document.getElementById("logDate");
    let hours = document.getElementById("newHours");
    let footer = document.getElementById("logHoursFooter");
    let title = document.getElementById("logHoursTitle");

    logDate.min = listOfSprints[sprintIndex.index]["start"];
    logDate.max = listOfSprints[sprintIndex.index]["end"];
    logDate.value = "yyyy-MM-dd";
    hours.value = "";
    
    let memberInd = listOfSprints[sprintIndex.index]["inProgress"][index]["card"]["_assignee"];

    for (let i=0; i < listOfTeamMembers.length; i++){
        if (listOfTeamMembers[i].index == memberInd){

            title.innerHTML = `${listOfTeamMembers[i].member.name}`;
            break;
        }
    }

    let footerOutput = `<button title="Save Changes" id="save" class="logTimeSaveButton" onclick="saveLogHours(${memberInd})"> Log </button>`;
    footer.innerHTML = footerOutput;

    let hoursForm = document.getElementById("logHoursForm");
    hoursForm.classList.add("show");
}

function logHoursClose(){
    /**
     * Closes the log hours modal
     */

    let hoursForm = document.getElementById("logHoursForm");
    hoursForm.classList.remove("show");
}

function saveLogHours(membInd){
    /**
     * Saves the hours logged for a member
     */

    let logDate = document.getElementById("logDate").value;
    let hours = document.getElementById("newHours").value;

    if (logDate=="" | hours==""){
        
        alert("Please ensure all fields are filled.")
        return
    }

    if (confirm('Are you sure you want these choices?')){
        
        //Create new log dictionary
        let logData = {"date": logDate, "hours": parseFloat(hours)};

        chartTimeLog(logData['hours'], logData['date']);
        
        for (let i=0; i < listOfTeamMembers.length; i++){

            if (listOfTeamMembers[i].index == membInd){

                listOfTeamMembers[i]["member"].workLog.push(logData);
                listOfTeamMembers[i]["member"].totalHoursLogged = parseFloat(listOfTeamMembers[i]["member"].totalHoursLogged) + parseFloat(hours);
                break;
            }
        }
        
        //Update local storage and close the form
        savelistOfTeamMembers();
        logHoursClose();
    }
}

function logTaskTime(index) {
    /**
     * Logs the time for a task
     * @param {*} index - index of the card in the sprint log
     */
    let time = prompt("How many hours did you spend on this task?");
    let taskAssignee = listOfSprints[sprintIndex.index]["inProgress"][index]["card"]["_assignee"];
    let taskName = listOfSprints[sprintIndex.index]["inProgress"][index]["card"]["_name"];
    console.log(taskName);

    //get assignee from listOfTeamMembers
    loadlistOfTeamMembers()
    //get team member index
    index = getTeamMemberIndex(taskAssignee);

    listOfTeamMembers[index]["totalHoursLogged"] += parseInt(time);

    //get date
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let dateString = month + "/" + day + "/" + year;

    loadWorkLog();
    workLog.push([taskName,teamMember,time, dateString]);
    saveWorkLog();

    savelistOfTeamMembers()

}


function getTeamMemberIndex(taskAssignee) {

    /**
     * Gets the index of the team member in the listOfTeamMembers array
     * @param {*} taskAssignee - the name of the assignee
     */
    //for use in logTaskTime
    let teamMemberIndex = 0;
    for (let i = 0; i < listOfTeamMembers.length; i++) {

        console.log(listOfTeamMembers[i]["name"]);

        if (listOfTeamMembers[i]["name"] == taskAssignee) {
            teamMemberIndex = i;
            console.log("index: " + teamMemberIndex);
            return teamMemberIndex;
        }
    }
}


//Moving Tasks Between Not Started, In Progress, Completed
function moveToNotStarted(listIndex){
    /**
     * Moves a task from in progress to not started
     * @param {*} listIndex - index of the card in the sprint log
     */

    let card = listOfSprints[sprintIndex.index]["inProgress"].splice(listIndex, 1)[0];
    card["card"]["_status"] = "Not Started";
    listOfSprints[sprintIndex.index]["notStarted"].push(card);
    saveListOfSprints();
    inProgressDisplay();
}

function moveToStarted(listIndex, status){
    /**
     * Moves a task from not started to in progress
     * @param {*} listIndex - index of the card in the sprint log
     * @param {*} status - status of the card
     */

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
    /**
     * Moves a task from in progress to complete
     * @param {*} listIndex - index of the card in the sprint log
     */

    let card = listOfSprints[sprintIndex.index]["inProgress"].splice(listIndex, 1)[0];
    card["card"]["_status"] = "Completed";
    listOfSprints[sprintIndex.index]["complete"].push(card);
    saveListOfSprints();
    inProgressDisplay();
}



//Editing Cards
//Editing Cards in Product Log
function editCardPL(index){
    /**
     * Opens the edit card modal for the product log
     * @param {*} index - index of the card in the product log
     */

    //Make Modal Appear
    let modalRef = document.getElementById("modal_container");

    let card = listOfCards[index]["card"];

    let nameRef = document.getElementById("newTaskName");
    let typeRef = document.getElementById("newType");
    let storyPointsRef = document.getElementById("newStoryPoints");
    let tagRef = document.getElementById("newTag");
    let priorityRef = document.getElementById("newPriority");
    let assigneeRef = document.getElementById("newAssignee");
    let descriptionRef = document.getElementById("newDescription");

    nameRef.value = card["_name"];
    typeRef.value = card["_type"];
    storyPointsRef.value = card["_storyPoints"];
    tagRef.value = card["_tag"];
    priorityRef.value = card["_priority"];
    descriptionRef.value = card["_description"];

    let assigneeOuput = `<option disabled="disabled" value="">Choose Assignee:</option>`;
    for (let i=0; i < listOfTeamMembers.length; i++){

        assigneeOuput += `<option value="${listOfTeamMembers[i].index}" >${listOfTeamMembers[i].member.name}</option>`;
    }
    assigneeRef.innerHTML = assigneeOuput;
    assigneeRef.value = card["_assignee"];

    let footer = document.getElementById("modalFooter");
    footer.innerHTML = `<button title="Save Changes" id="save" class="modalSave" onclick="saveCardPL(${index})"> Save </button>`

    modalRef.classList.add("show");
}

//Editing Cards in Sprint Log
function editCardSL(index, status){
    /**
     * Opens the edit card modal for the sprint log
     * @param {*} index - index of the card in the sprint log
     */

    //Make Modal Appear
    let modalRef = document.getElementById("modal_container");

    let nameRef = document.getElementById("newTaskName");
    let typeRef = document.getElementById("newType");
    let storyPointsRef = document.getElementById("newStoryPoints");
    let tagRef = document.getElementById("newTag");
    let priorityRef = document.getElementById("newPriority");
    let assigneeRef = document.getElementById("newAssignee");
    let descriptionRef = document.getElementById("newDescription");

    let card = NaN;
    if (status == 0){
        card = listOfSprints[sprintIndex.index]["notStarted"][index]["card"];
    }
    else if (status == 1){
        card = listOfSprints[sprintIndex.index]["inProgress"][index]["card"];
    }
    else if (status == 2){
        card = listOfSprints[sprintIndex.index]["complete"][index]["card"];
    }

    nameRef.value = card["_name"];
    typeRef.value = card["_type"];
    storyPointsRef.value = card["_storyPoints"];
    tagRef.value = card["_tag"];
    priorityRef.value = card["_priority"];
    descriptionRef.value = card["_description"];

    let assigneeOuput = `<option disabled="disabled" value="">Choose Assignee:</option>`;
    for (let i=0; i < listOfTeamMembers.length; i++){

        assigneeOuput += `<option value="${listOfTeamMembers[i].index}" >${listOfTeamMembers[i].member.name}</option>`;
    }
    assigneeRef.innerHTML = assigneeOuput;
    assigneeRef.value = card["_assignee"];

    let footer = document.getElementById("modalFooter");
    footer.innerHTML = `<button title="Save Changes" id="save" class="modalSave" onclick="saveCardSL(${index}, ${status})"> Save </button>`

    modalRef.classList.add("show");
}

//Saving Cards in Product Log
function saveCardPL(index){
    /**
     * Saves the changes made to the card in the product log
     * @param {*} index - index of the card in the product log
     */

    let nameRef = document.getElementById("newTaskName").value;
    let typeRef = document.getElementById("newType").value;
    let storyPointsRef = document.getElementById("newStoryPoints").value;
    let tagRef = document.getElementById("newTag").value;
    let priorityRef = document.getElementById("newPriority").value;
    let assigneeRef = document.getElementById("newAssignee").value;
    let descriptionRef = document.getElementById("newDescription").value;

    //Checks to see that none of the fields are empty
    if (nameRef=="" || typeRef=="" || storyPointsRef=="" || tagRef=="" || priorityRef=="" || assigneeRef=="" || descriptionRef==""){
        alert("Ensure all fields are filled!");
        return;
    }
    if(storyPointsRef < 0){
        alert("Story points must be greater than zero!");
        return;
    }

    if (confirm("Are you sure you want these choices?")){

        listOfCards[index]["card"]["_name"] = nameRef;
        listOfCards[index]["card"]["_type"] = typeRef;
        listOfCards[index]["card"]["_storyPoints"] = storyPointsRef;
        listOfCards[index]["card"]["_tag"] = tagRef;
        listOfCards[index]["card"]["_priority"] = priorityRef;
        listOfCards[index]["card"]['_assignee'] = assigneeRef;
        listOfCards[index]["card"]['_description'] = descriptionRef;

        savelistOfCards();
        notStartedDisplay(); //Display cards
        closeModal(); //Close Modal
    }
}

//Saving Cards in Sprint Log
function saveCardSL(index, status){
    /**
     * Saves the changes made to the card in the sprint log
     * @param {*} index - index of the card in the sprint log
     * @param {*} status - status of the card in the sprint log
     */

    let nameRef = document.getElementById("newTaskName").value;
    let typeRef = document.getElementById("newType").value;
    let storyPointsRef = document.getElementById("newStoryPoints").value;
    let tagRef = document.getElementById("newTag").value;
    let priorityRef = document.getElementById("newPriority").value;
    let assigneeRef = document.getElementById("newAssignee").value;
    let descriptionRef = document.getElementById("newDescription").value;

    //Checks to see that none of the fields are empty
    if (nameRef=="" || typeRef=="" || storyPointsRef=="" || tagRef=="" || priorityRef=="" || assigneeRef=="" || descriptionRef==""){
        alert("Ensure all fields are filled!");
        return;
    }
    if(storyPointsRef < 0){
        alert("Story points must be greater than zero!");
        return;
    }

    if (confirm("Are you sure you want these choices?")){

        let card = NaN;
        if (status == 0){
            card = listOfSprints[sprintIndex.index]["notStarted"][index]["card"];
        }
        else if (status == 1){
            card = listOfSprints[sprintIndex.index]["inProgress"][index]["card"];
        }
        else if (status == 2){
            card = listOfSprints[sprintIndex.index]["complete"][index]["card"];
        }

        card["_name"] = nameRef;
        card["_type"] = typeRef;
        card["_storyPoints"] = storyPointsRef;
        card["_tag"] = tagRef;
        card["_priority"] = priorityRef;
        card['_assignee'] = assigneeRef;
        card['_description'] = descriptionRef;

        savelistOfCards();
        
        if (listOfSprints[sprintIndex.index].status == 0){
            notStartedDisplay();
        }
        else if (listOfSprints[sprintIndex.index].status == 1){
            inProgressDisplay();
        }
        else if (listOfSprints[sprintIndex.index].status == 2){
            completedDisplay();
        }

        closeModal(); //Close Modal
    }
}

function closeModal(){
    /**
     * Closes the modal
     */

    let modalRef = document.getElementById("modal_container");
    modalRef.classList.remove("show");
}



//On loading page we check and update the local storage as necessary
function onLoadSprintLog(){
    /**
     * Function to run on page load
     */
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

    loadlistOfTeamMembers();
    if (listOfTeamMembers == null){
        listOfTeamMembers = [];
        savelistOfTeamMembers();
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
    changeChart();
    displayDataOnload();
    loadlistOfTeamMembers();
}