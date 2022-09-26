"use strict";

// array of cards
let listOfCards = [];
//initialise local storage of listOfCard

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
    loadlistOfCards()

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

        savelistOfCards() //save to local storage
        displayCards(); //Display cards
        closeModal(); //Close modal

    }

}

function displayCards(){

    //Initialise holding container ref and output
    let cardWrapperRef = document.getElementById("card_wrap");
    let cardWrapperOutput = ``;

    loadlistOfCards()

    for (let i=0; i<listOfCards.length; i++){
        cardWrapperOutput += `
    <div class="card_item">
        <div class="card_inner"> 
            <div class="name">${listOfCards[i]["card"]['_name']}</div>
            <div class="priority"> <i class="fa-solid fa-triangle-exclamation fa-xl"></i> <h3>${listOfCards[i]["card"]['_priority']}</h3> </div>
            <div class="tag"> <i class="fa-solid fa-tag fa-xl"></i> <h3>${listOfCards[i]["card"]['_tag']}</h3> </div>
            <div class="storyPoints"> <i class="fa-solid fa-coins fa-xl"></i> <h3>${listOfCards[i]["card"]['_storyPoints']}</h3> </div>
            <div class="editButton">
                <button type="button" onclick="editCard(${listOfCards[i]["index"]})"> <i class="fa-solid fa-pen-to-square"></i> </button>
            </div>
            <div class="deleteButton">
                <button type="button" onclick="deleteCard(${listOfCards[i]["index"]})"> <i class="fa-solid fa-trash-can"></i> </button>
            </div>
            <div class="viewButton">
                <button type="button" onclick="viewCard(${listOfCards[i]["index"]})"> <i class="fa-solid fa-bars"></i> </button>
            </div>
        </div>
    </div>`


    }

    //Editing the inner HTML element to display cards
    cardWrapperRef.innerHTML = cardWrapperOutput;


}

function viewCard(cardIndex){

    let theTask = 0;

    for (let i = 0; i < listOfCards.length; i++){
        if (cardIndex == listOfCards[i]["index"]){
            theTask = listOfCards[i]["card"];
        }
    }
    let nameRef = document.getElementById("viewTaskName");
    let typeRef = document.getElementById("viewTaskType");
    let storyPointsRef = document.getElementById("viewStoryPoints");
    let tagRef = document.getElementById("viewTag");
    let priorityRef = document.getElementById("viewPriority");
    let assigneeRef = document.getElementById("viewAssignee");
    let descriptionRef = document.getElementById("viewDescription");
    let statusRef = document.getElementById("viewStatus");

    let modal_view = document.getElementById("modal_view");
    modal_view.classList.add("show");

    nameRef.innerHTML = theTask["_name"];
    typeRef.innerHTML = theTask["_type"];
    storyPointsRef.innerHTML = theTask["_storyPoints"];
    tagRef.innerHTML = theTask["_tag"];
    priorityRef.innerHTML = theTask["_priority"];
    assigneeRef.innerHTML = theTask["_assignee"];
    descriptionRef.innerHTML = theTask["_description"];
    statusRef.innerHTML = theTask["_status"];
}

function closeView(){
    let modal_view = document.getElementById("modal_view");
    modal_view.classList.remove("show");
}

function editCard(listIndex){
    loadlistOfCards()
    let theTask = 0;
    let theCard = 0;
    let arrIndex = 0;
    for (let i = 0; i < listOfCards.length; i++){
        if (listIndex == listOfCards[i]["index"]){
            theTask = listOfCards[i];
            theCard = listOfCards[i]["card"];
            arrIndex = i;
        }
    }

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
    document.getElementById("save").onclick = function() {saveEdit(arrIndex)};
    //then go through the saving process again
    savelistOfCards()

}


function deleteCard(listIndex){
    if (confirm("Are you sure you want to delete this card?")){
        for (let i=0; i < listOfCards.length; i++){
            if (listIndex == listOfCards[i]["index"]){
                loadlistOfCards()
                listOfCards.splice(i, 1)
                savelistOfCards()
                displayCards()
            }
        }
    }
}

function saveEdit(arrIndex){
    let nameRef = document.getElementById("newTaskName").value;
    let typeRef = document.getElementById("newType").value;
    let storyPointsRef = document.getElementById("newStoryPoints").value;
    let tagRef = document.getElementById("newTag").value;
    let priorityRef = document.getElementById("newPriority").value;
    let assigneeRef = document.getElementById("newAssignee").value;
    let descriptionRef = document.getElementById("newDescription").value;
    let statusRef = document.getElementById("newStatus").value;

    //let editedTask = new task(nameRef, typeRef, storyPointsRef, tagRef, priorityRef, assigneeRef, descriptionRef, statusRef);

    //Checks to see that none of the fields are empty
    if (nameRef=="" || typeRef=="" || storyPointsRef=="" || tagRef=="" || priorityRef=="" || assigneeRef=="" || descriptionRef=="" || statusRef==""){
        alert("Ensure all fields are filled!");
        return;
    }

    if (confirm("Are you sure you want these choices?")){

        //Setting the taskID
        //let taskID = oldTask["index"];
        //When there are cards, will set the index ID to next greatest index

        //Create the temp item, and then push
        // let tempItem = {index: taskID, card: editedTask};

        // for (let i=0; i < listOfCards.length; i++){
        //     if (i == oldTask["index"]){
        //         listOfCards.splice(i,1,tempItem)

        //     }

        listOfCards[arrIndex]["card"].name = nameRef;
        listOfCards[arrIndex]["card"].type = typeRef;
        listOfCards[arrIndex]["card"].storyPoints = storyPointsRef;
        listOfCards[arrIndex]["card"].tag = tagRef;
        listOfCards[arrIndex]["card"].priority = priorityRef;
        listOfCards[arrIndex]["card"].assignee = assigneeRef;
        listOfCards[arrIndex]["card"].description = descriptionRef;
        listOfCards[arrIndex]["card"].status = statusRef;

        savelistOfCards();
        displayCards(); //Display cards
        closeModal(); //Close modal
        document.getElementById("save").onclick = function() {saveCard()};


    }
}

function savelistOfCards(){
    //saves list of cards to local storage

    //if there is no list
    if (localStorage.getItem("listOfCards") == null){
        localStorage.setItem("listOfCards", JSON.stringify(listOfCards));
    }

    localStorage.removeItem("listOfCards");
    //save the new list
    localStorage.setItem("listOfCards", JSON.stringify(listOfCards));
}

function loadlistOfCards(){
    //get dictionary from storage
    listOfCards = JSON.parse(localStorage.getItem("listOfCards"));
}

//made so we could clear from console when debugging
function clearlistOfCards(){
    localStorage.clear();
    listOfCards = [];
    displayCards();
}