"use strict";

// array of cards

let listOfCards = [];

function openModal(){

    let modal_container = document.getElementById("modal_container");
    modal_container.classList.add("show");

    let nameRef = document.getElementById("newTaskName");
    let typeRef = document.getElementById("newType");
    let storyPointsRef = document.getElementById("newStoryPoints");
    let tagRef = document.getElementById("newTag");
    let priorityRef = document.getElementById("newPriority");
    let assigneeRef = document.getElementById("newAssignee");
    let descriptionRef = document.getElementById("newDescription");
    let statusRef = document.getElementById("newStatus");

    //Clear values from all these elements
    nameRef.value = "";
    typeRef.value = "";
    storyPointsRef.value = "";
    tagRef.value = "";
    priorityRef.value = "";
    assigneeRef.value = "";
    descriptionRef.value = "";
    statusRef.value = "";

}


function closeModal(){
    let modal_container = document.getElementById("modal_container");
    modal_container.classList.remove("show");
}


function saveCard(){

    let nameRef = document.getElementById("newTaskName").value;
    let typeRef = document.getElementById("newType").value;
    let storyPointsRef = document.getElementById("newStoryPoints").value;
    let tagRef = document.getElementById("newTag").value;
    let priorityRef = document.getElementById("newPriority").value;
    let assigneeRef = document.getElementById("newAssignee").value;
    let descriptionRef = document.getElementById("newDescription").value;
    let statusRef = document.getElementById("newStatus").value;

    let tempTask = new task(nameRef, typeRef, storyPointsRef, tagRef, priorityRef, assigneeRef, descriptionRef, statusRef);

    //Checks to see that none of the fields are empty
    if (tempTask.name=="" || tempTask.type=="" || tempTask.storyPoints=="" || tempTask.tag=="" || tempTask.priority=="" || tempTask.assignee=="" || tempTask.description=="" || tempTask.status==""){
        alert("Ensure all fields are filled!");
        return;
    }

    //Confirmation of changes will create the task
    if (confirm("Are you sure you want these choices?")){

        //Setting the taskID
        let taskID = 0;
        //When there are cards, will set the index ID to next greatest index
        if (listOfCards.length != 0){
            taskID = listOfCards[listOfCards.length-1]["index"] + 1
        }
        
        //Create the temp item, and then push
        let tempItem = {index: taskID, card: tempTask}
        listOfCards.push(tempItem);
    
        displayCards(); //Display cards
        closeModal(); //Close modal
    }

}


function displayCards(){

    //Initialise holding container ref and output
    let cardWrapperRef = document.getElementById("card_wrap");
    let cardWrapperOutput = ``;

    //go through each card and add elements for display
    for (let i=0; i<listOfCards.length; i++){
        cardWrapperOutput += `
    <div class="card_item">
        <div class="card_inner">
            <div class="name">${listOfCards[i]["card"].name}</div>
            <div class="priority"> <i class="fa-solid fa-triangle-exclamation fa-xl"></i> <h3>${listOfCards[i]["card"].priority}</h3> </div>
            <div class="tag"> <i class="fa-solid fa-tag fa-xl"></i> <h3>${listOfCards[i]["card"].tag}</h3> </div>
            <div class="storyPoints"> <i class="fa-solid fa-coins fa-xl"></i> <h3>${listOfCards[i]["card"].storyPoints}</h3> </div>
            <div class="editButton">
                <button type="button" onclick="editCard(${listOfCards[i]["index"]})"> <i class="fa-solid fa-pen-to-square"></i> </button>
            </div>
        </div>
    </div>`
    }
    
    //Editing the inner HTML element to display cards
    cardWrapperRef.innerHTML = cardWrapperOutput;

}


function editCard(listIndex){
    console.log(listIndex);
    let theTask = listOfCards[listIndex]
    let theCard = listOfCards[listIndex]["card"];
    
    //Will look up the index saved onto the onclick function
    let nameRef = document.getElementById("newTaskName");
    let typeRef = document.getElementById("newType");
    let storyPointsRef = document.getElementById("newStoryPoints");
    let tagRef = document.getElementById("newTag");
    let priorityRef = document.getElementById("newPriority");
    let assigneeRef = document.getElementById("newAssignee");
    let descriptionRef = document.getElementById("newDescription");
    let statusRef = document.getElementById("newStatus");

    let modal_container = document.getElementById("modal_container");
    modal_container.classList.add("show");

    nameRef.value = theCard.name;
    typeRef.value = theCard.type;
    storyPointsRef.value = theCard.storyPoints;
    tagRef.value = theCard.tag;
    priorityRef.value = theCard.priority;
    assigneeRef.value = theCard.assignee;
    descriptionRef.value = theCard.description;
    statusRef.value = theCard.status;
    //Displays that information and allows the user to edit it\
    document.getElementById("save").onclick = function() {saveEdit(theTask)};
    //then go through the saving process again

}


function saveEdit(oldTask){
    let nameRef = document.getElementById("newTaskName").value;
    let typeRef = document.getElementById("newType").value;
    let storyPointsRef = document.getElementById("newStoryPoints").value;
    let tagRef = document.getElementById("newTag").value;
    let priorityRef = document.getElementById("newPriority").value;
    let assigneeRef = document.getElementById("newAssignee").value;
    let descriptionRef = document.getElementById("newDescription").value;
    let statusRef = document.getElementById("newStatus").value;

    let editedTask = new task(nameRef, typeRef, storyPointsRef, tagRef, priorityRef, assigneeRef, descriptionRef, statusRef);

    //Checks to see that none of the fields are empty
    if (editedTask.name=="" || editedTask.type=="" || editedTask.storyPoints=="" || editedTask.tag=="" || editedTask.priority=="" || editedTask.assignee=="" || editedTask.description=="" || editedTask.status==""){
        alert("Ensure all fields are filled!");
        return;
    }

    if (confirm("Are you sure you want these choices?")){

        //Setting the taskID
        let taskID = oldTask["index"];
        //When there are cards, will set the index ID to next greatest index
        
        //Create the temp item, and then push
        let tempItem = {index: taskID, card: editedTask};

        for (let i=0; i < listOfCards.length; i++){
            if (i == oldTask["index"]){
                listOfCards.splice(i,1,tempItem)

            }
        }
    
        displayCards(); //Display cards
        closeModal(); //Close modal
        document.getElementById("save").onclick = function() {saveCard()};
    }
}

//Sorting functions - to compliment filtering function
function sortName(){
    //Prompt user for task name
    let name = prompt("Enter the name of the task you want to sort by: ");
    let filteredListOfCards = [];
    //iterate through cards
    for (let i = 0; i < listOfCards.length; i++) {
        //if the card has the same name, add to filtered list
        if (listOfCards[i]["card"].name == name) {
            filteredListOfCards.push(listOfCards[i]);
        }
    }
    //display the filtered list
    displayCards(filteredListOfCards);
}

function sortType(){
    //Prompt user for task type
    let type = prompt("Enter the type of the task you want to sort by (Bug or Story): ");
    let filteredListOfCards = [];
    //iterate through cards
    for (let i = 0; i < listOfCards.length; i++) {
        //if the card has the same type, add to filtered list
        if (listOfCards[i]["card"].type == type) {
            filteredListOfCards.push(listOfCards[i]);
        }
    }
    //display the filtered list
    displayCards(filteredListOfCards);
}


function sortStoryPoints() {
    //Prompt User for number of story points to filter by
    let storyPoints = prompt("Enter the number of story points to filter by");
    let filteredListOfCards = [];
    //iterate through cards
    for (let i = 0; i < listOfCards.length; i++) {
        //if the card has the same number of story points, add to filtered list
        if (listOfCards[i]["card"].storyPoints == storyPoints) {
            filteredListOfCards.push(listOfCards[i]);
        }
    }
    //display filtered list
    displayCardsFiltered(filteredListOfCards);
}

function sortTag(){
    //Prompt User for tag to filter by
    let tag = prompt("Enter the tag to filter by(UI, Core, Testing)");
    let filteredListOfCards = [];
    //iterate through cards
    for (let i = 0; i < listOfCards.length; i++) {
        //if the card has the same tag, add to filtered list
        if (listOfCards[i]["card"].tag == tag) {
            filteredListOfCards.push(listOfCards[i]);
        }
    }
    //display filtered list
    displayCardsFiltered(filteredListOfCards);
}

function sortPriority(){
    //Prompt User for priority to filter by
    let priority = prompt("Enter the priority to filter by(Low,Medium,High,Critical");
    let filteredListOfCards = [];
    //iterate through cards
    for (let i = 0; i < listOfCards.length; i++) {
        //if the card has the same priority, add to filtered list
        if (listOfCards[i]["card"].priority == priority) {
            filteredListOfCards.push(listOfCards[i]);
        }
    }
    //display filtered list
    displayCardsFiltered(filteredListOfCards);
}

function sortStatus(){
    //Prompt User for status to filter by
    let status = prompt("Enter the status to filter by(Not Started, In Progress, Completed");
    let filteredListOfCards = [];
    //iterate through cards
    for (let i = 0; i < listOfCards.length; i++) {
        //if the card has the same status, add to filtered list
        if (listOfCards[i]["card"].status == status) {
            filteredListOfCards.push(listOfCards[i]);
        }
    }
    displayCardsFiltered(filteredListOfCards);

}

function sortAssignee(){
    let assignee = prompt("Enter the assignee to filter by");
    let filteredListOfCards = [];
    //iterate through cards
    for (let i = 0; i < listOfCards.length; i++) {
        //if the card has the same assignee, add to filtered list
        if (listOfCards[i]["card"].assignee == assignee) {
            filteredListOfCards.push(listOfCards[i]);
        }
    }
    displayCardsFiltered(filteredListOfCards);
}


function displayCardsFiltered(listOfCards){
    //Initialise holding container ref and output
    let cardWrapperRef = document.getElementById("card_wrap");
    let cardWrapperOutput = ``;
    //remove all elements from display
    cardWrapperRef.innerHTML = cardWrapperOutput;

    //go through each card and add elements for display
    for (let i=0; i<listOfCards.length; i++){

        cardWrapperOutput += `
    <div class="card_item">
        <div class="card_inner">
            <div class="name">${listOfCards[i]["card"].name}</div>
            <div class="priority"> <i class="fa-solid fa-triangle-exclamation fa-xl"></i> <h3>${listOfCards[i]["card"].priority}</h3> </div>
            <div class="tag"> <i class="fa-solid fa-tag fa-xl"></i> <h3>${listOfCards[i]["card"].tag}</h3> </div>
            <div class="storyPoints"> <i class="fa-solid fa-coins fa-xl"></i> <h3>${listOfCards[i]["card"].storyPoints}</h3> </div>
            <div class="editButton">
                <button type="button" onclick="editCard(${listOfCards[i]["index"]})"> <i class="fa-solid fa-pen-to-square"></i> </button>
            </div>
        </div>
    </div>`
    }

    //Editing the inner HTML element to display cards
    cardWrapperRef.innerHTML = cardWrapperOutput;

}
