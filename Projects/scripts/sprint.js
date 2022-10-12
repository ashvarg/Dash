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

    //add button to log time
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
                <div class="sprintCardName">
                    ${listOfCards[i]["card"]["_name"]}
                    <button type="button" onclick="editCardPL(${i})" class="editButton"> <i class="fa-solid fa-pen-to-square"></i> </button>
                </div>
                <div class="sprintCardButtons">
                    <button type="button" onclick="displayPLDetails(${i})" class="detailsButton"> <i class="fa fa-bars"></i> </button> 
                    <button type="button" onclick="addToSprint(${i})" class="rightButton"> <i class="fa fa-arrow-right"></i> </button> 
                </div>
            </div>`
    }
    backlogRef.innerHTML = backOutput;

    //Display all cards in sprint log
    let sprintlogRef = document.getElementById("sprintLog");
    let sprintOutput = `<h4> Sprint Log </h4>`;
    for (let i=0; i<listOfSprints[sprintIndex.index]["notStarted"].length; i++){

        sprintOutput += `<div class="sprintCard"> 
                <div class="sprintCardName">
                    ${listOfSprints[sprintIndex.index]["notStarted"][i]["card"]["_name"]}
                    <button type="button" onclick="editCardSL(${i}, ${0})" class="editButton"> <i class="fa-solid fa-pen-to-square"></i> </button>
                </div>
                <div class="sprintCardButtons">
                    <button type="button" onclick="removeFromSprint(${i})" class="leftButton"> <i class="fa fa-arrow-left"></i> </button>  
                    <button type="button" onclick="displaySLDetails(${i}, ${0})" class="detailsButton"> <i class="fa fa-bars"></i> </button> 
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
        <div class="sprintCardName">
            ${listOfSprints[index]["notStarted"][i]["card"]["_name"]}
            <button type="button" onclick="editCardSL(${i}, ${0})" class="editButton"> <i class="fa-solid fa-pen-to-square"></i> </button>
        </div>
        <div class="sprintCardButtons">
            <button type="button" onclick="displaySLDetails(${i}, ${0})" class="detailsButton"> <i class="fa fa-bars"></i> </button> 
            <button type="button" onclick="moveToStarted(${i},${0})" class="rightButton"> <i class="fa fa-arrow-right"></i> </button>
        </div>
    </div>`;
    }
    notStartedRef.innerHTML = notStartedOutput;

    //Add cards to started
    for (let i=0; i<listOfSprints[index]["inProgress"].length; i++){
        startedOutput += `<div class="sprintCard"> 
            <div class="sprintCardName">
                ${listOfSprints[index]["inProgress"][i]["card"]["_name"]}
                <button type="button" onclick="editCardSL(${i}, ${1})" class="editButton"> <i class="fa-solid fa-pen-to-square"></i> </button>
            </div>
            <div class="sprintCardButtons">
                <button type="button" onclick="moveToNotStarted(${i})" class="leftButton"> <i class="fa fa-arrow-left"></i> </button>  
                <button type="button" onclick="displaySLDetails(${i}, ${1})" class="detailsButton"> <i class="fa fa-bars"></i> </button> 
                <button type="button" onclick="moveToComplete(${i})" class="rightButton"> <i class="fa fa-arrow-right"></i> </button> 
                <button type="button" onclick="logTaskTime(${i})" class="timeButton"> <i class="fa-solid fa-clock"></i> </button>
            </div>
        </div>`;
    }
    startedRef.innerHTML = startedOutput;

    //Add cards to completed
    for (let i=0; i<listOfSprints[index]["complete"].length; i++){
        completedOutput += `<div class="sprintCard"> 
            <div class="sprintCardName">
                ${listOfSprints[index]["complete"][i]["card"]["_name"]}
                <button type="button" onclick="editCardSL(${i}, ${2})" class="editButton"> <i class="fa-solid fa-pen-to-square"></i> </button>
            </div>
            <div class="sprintCardButtons">
                <button type="button" onclick="moveToStarted(${i}, ${2})" class="leftButton"> <i class="fa fa-arrow-left"></i> </button>  
                <button type="button" onclick="displaySLDetails(${i}, ${2})" class="detailsButton"> <i class="fa fa-bars"></i> </button> 
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
        <div class="sprintCardName">
            ${listOfSprints[index]["notStarted"][i]["card"]["_name"]}
        </div>
        <div class="sprintCardButtons">
            <button type="button" onclick="displaySLDetails(${i}, ${0})" class="detailsButton"> <i class="fa fa-bars"></i> </button> 
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
                <button type="button" onclick="displaySLDetails(${i}, ${1})" class="detailsButton"> <i class="fa fa-bars"></i> </button> 
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
                <button type="button" onclick="displaySLDetails(${i}, ${2})" class="detailsButton"> <i class="fa fa-bars"></i> </button> 
            </div>
        </div>`;
    }
    completedRef.innerHTML = completedOutput;
}


//Displaying the sprint status buttons depending on what our sprint status is
function sprintStatusButtons() {

    //References to status text and button div
    let statusText = document.getElementById("statusText");
    let statusButton = document.getElementById("statusChange");

    //Not Started
    if (listOfSprints[sprintIndex.index]["status"] == 0) {

        let ref = `<button type="button" onclick="startSprint()"> Start Sprint</button>`

        statusButton.innerHTML = ref;
        statusText.innerHTML = "Sprint Status: Not Started";
    }
    //Started
    else if (listOfSprints[sprintIndex.index]["status"] == 1) {

        statusButton.innerHTML = `<button type="button" onclick="endSprint()"> End Sprint</button>`;
        statusText.innerHTML = "Sprint Status: In Progress";
    }
    //Completed
    else if (listOfSprints[sprintIndex.index]["status"] == 2) {

        statusButton.innerHTML = "";
        statusText.innerHTML = "Sprint Status: Completed";
    }
}
function logTaskTime(index) {
    let time = prompt("How many hours did you spend on this task?");
    let taskAssignee = listOfSprints[sprintIndex.index]["inProgress"][index]["card"]["_assignee"];
    //get assignee from listOfTeamMembers
    loadlistOfTeamMembers()
    //get team member index
    console.log(listOfTeamMembers);


    index = getTeamMemberIndex(taskAssignee);
    console.log(index);
    //add time to team member
    listOfTeamMembers[index]["workLog"].addLog(time);
    listOfTeamMembers[index]["totalHoursLogged"] += time;

    savelistOfTeamMembers()

}
function getTeamMemberIndex(taskAssignee) {
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



//Editing Cards
//Editing Cards in Product Log
function editCardPL(index){

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
    assigneeRef.value = card["_assignee"];
    descriptionRef.value = card["_description"];

    let footer = document.getElementById("modalFooter");
    footer.innerHTML = `<button id="save" class="modalSave" onclick="saveCardPL(${index})"> Save </button>`

    modalRef.classList.add("show");
}

//Editing Cards in Sprint Log
function editCardSL(index, status){

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
    assigneeRef.value = card["_assignee"];
    descriptionRef.value = card["_description"];

    let footer = document.getElementById("modalFooter");
    footer.innerHTML = `<button id="save" class="modalSave" onclick="saveCardSL(${index}, ${status})"> Save </button>`

    modalRef.classList.add("show");
}

//Saving Cards in Product Log
function saveCardPL(index){

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

    let modalRef = document.getElementById("modal_container");
    modalRef.classList.remove("show");
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

    loadlistOfTeamMembers();
}