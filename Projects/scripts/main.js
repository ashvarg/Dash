"use strict";

// array of cards

let listOfCards = [];

// just for opening the card into card view 
function openCard(){
    document.getElementById("myCard").style.display = "block";
}

function closeCard(){
    document.getElementById("myCard").style.display = "none";
    
}



function addCard(){

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

function closeCard(){
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

    listOfCards.push(tempTask);

    displayCards();
    closeCard();

}

function displayCards(){

    //Initialise holding container ref and output
    let holdingContainerRef = document.getElementById("holdingContainer");
    let holdingContainerOutput = ``;

    //go through each card and add elements for display
    for (let i=0; i<listOfCards.length; i++){
        holdingContainerOutput += `
        <div class="taskCard"> 
            <h4><b>${listOfCards[i].name}</b></h4>
            <button type="button" class="editTaskButton" > Edit </button>
        </div>`
    }
    
    //Editing the inner HTML element to display cards
    holdingContainerRef.innerHTML = holdingContainerOutput;

}