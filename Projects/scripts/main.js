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

    let taskID = 0;
    if (listOfCards.length != 0){
        taskID = listOfCards[listOfCards.length-1]["index"] + 1
    }

    let tempItem = {index: taskID, card: tempTask}

    listOfCards.push(tempItem);

    displayCards();
    closeCard();

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
            <div class="priority">Priority: ${listOfCards[i]["card"].priority}</div>
            <div class="tag">Tag: ${listOfCards[i]["card"].tag}</div>
            <div class="storyPoints">Story Points: ${listOfCards[i]["card"].storyPoints}</div>
            <div class="editButton">
                <button type="button" onclick="editCard(${listOfCards[i]["index"]})">Edit</button>
            </div>
        </div>
    </div>`
    }
    
    //Editing the inner HTML element to display cards
    cardWrapperRef.innerHTML = cardWrapperOutput;

}


function editCard(listIndex){
    console.log(listIndex);
}