"use strict";

let productBacklogFilter = "All"; //options are All, UI, Core, Testing

//initialise local storage of listOfCard
function onLoadProductBacklog(){
    loadlistOfCards()
    if (listOfCards == null){
        listOfCards = [];
        savelistOfCards()
    }
    displayCards()
    loadTaskIndexes();
    if (taskIndexes == null){
        taskIndexes = {index: 0};
        saveTaskIndexes();
    }
}

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

    if (tempTask.storyPoints < 0){
        alert("Story points must be a greater than zero!");
        return;
    }

    //Confirmation of changes will create the task
    if (confirm("Are you sure you want these choices?")){

        // //Setting the taskID
        // let taskID = 0;
        // //When there are cards, will set the index ID to next greatest index
        // if (listOfCards.length != 0){
        //     taskID = listOfCards[listOfCards.length-1]["index"] + 1
        // }

        loadTaskIndexes();
        //Create the temp item, and then push
        let ind = taskIndexes["index"];
        let tempItem = {index: ind, card: tempTask}
        listOfCards.push(tempItem);

        taskIndexes["index"] = ind+1;
        saveTaskIndexes();
        savelistOfCards(); //save to local storage
        displayCards(); //Display cards
        closeModal(); //Close modal
    }
}


function displayCards(){

    //Initialise holding container ref and output
    let cardWrapperRef = document.getElementById("card_wrap");
    let cardWrapperOutput = ``;

    loadlistOfCards()

    //if list is not empty
    //if no filter is selected, display all cards
    if (productBacklogFilter == "All"){
        for (let i=0; i<listOfCards.length; i++) {
            cardWrapperOutput += `
        <div class="card_item">
            <div class="card_inner"> 
                <div class="name">${listOfCards[i]["card"]['_name']}</div>
                <div class="priority"> <i class="fa-solid fa-triangle-exclamation fa-xl"></i> <h3>${listOfCards[i]["card"]['_priority']}</h3> </div>
                <div class="tag"> <i class="fa-solid fa-tag fa-xl"></i> <h3>${listOfCards[i]["card"]['_tag']}</h3> </div>
                <div class="storyPoints"> <i class="fa-solid fa-coins fa-xl"></i> <h3>${listOfCards[i]["card"]['_storyPoints']}</h3> </div>

                <div class="card_foot">
                    <div class="editButton">
                        <button type="button" onclick="editCard(${listOfCards[i]["index"]})"> <i class="fa-solid fa-pen-to-square"></i> </button>
                    </div>
                    <div class="deleteButton">
                        <button type="button" onclick="deleteCard(${listOfCards[i]["index"]})"> <i class="fa-solid fa-trash-can"></i> </button>
                    </div>
                    <div class="viewButton">
                        <button type="button" onclick="viewCard(${listOfCards[i]["index"]})"> <i class="fa-solid fa-bars"></i> </button>
                    </div>
                    <div class="addSprintButton">
                        <button type="button" onclick="displayAddSprint(${listOfCards[i]["index"]})">Add To Sprint</button>
                    </div>
                </div>
            </div>
        </div>`
        }
    }
    else{
for (let i=0; i<listOfCards.length; i++) {
            if (listOfCards[i]["card"]['_tag'] == productBacklogFilter){
                cardWrapperOutput += `
        <div class="card_item">
            <div class="card_inner"> 
                <div class="name">${listOfCards[i]["card"]['_name']}</div>
                <div class="priority"> <i class="fa-solid fa-triangle-exclamation fa-xl"></i> <h3>${listOfCards[i]["card"]['_priority']}</h3> </div>
                <div class="tag"> <i class="fa-solid fa-tag fa-xl"></i> <h3>${listOfCards[i]["card"]['_tag']}</h3> </div>
                <div class="storyPoints"> <i class="fa-solid fa-coins fa-xl"></i> <h3>${listOfCards[i]["card"]['_storyPoints']}</h3> </div>

                <div class="card_foot">
                    <div class="editButton">
                        <button type="button" onclick="editCard(${listOfCards[i]["index"]})"> <i class="fa-solid fa-pen-to-square"></i> </button>
                    </div>
                    <div class="deleteButton">
                        <button type="button" onclick="deleteCard(${listOfCards[i]["index"]})"> <i class="fa-solid fa-trash-can"></i> </button>
                    </div>
                    <div class="viewButton">
                        <button type="button" onclick="viewCard(${listOfCards[i]["index"]})"> <i class="fa-solid fa-bars"></i> </button>
                    </div>
                    <div class="addSprintButton">
                        <button type="button" onclick="displayAddSprint(${listOfCards[i]["index"]})">Add To Sprint</button>
                    </div>
                </div>
            </div>
        </div>`
            }
        }

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
    
    // Changing text colour
    if (theTask["_priority"] == "Low"){
        priorityRef.style.color = "lightgreen";
    }
    else if (theTask["_priority"] == "Medium"){
        priorityRef.style.color = "orange";
    }
    else if (theTask["_priority"] == "High"){
        priorityRef.style.color = "red";
    }

    if (theTask["_status"] == "Completed"){
        statusRef.style.color = "lightgreen";
    }
    else if (theTask["_status"] == "In Progress"){
        statusRef.style.color = "orange";
    }
    else if (theTask["_status"] == "Not Started"){
        statusRef.style.color = "red";
    }
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

    nameRef.value = theCard["_name"];
    typeRef.value = theCard["_type"];
    storyPointsRef.value = theCard["_storyPoints"];
    tagRef.value = theCard["_tag"];
    priorityRef.value = theCard["_priority"];
    assigneeRef.value = theCard["_assignee"];
    descriptionRef.value = theCard["_description"];
    statusRef.value = theCard["_status"];
    //Displays that information and allows the user to edit it\

    document.getElementById("save").onclick = function() {saveEdit(arrIndex)};
    //then go through the saving process again

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
    if(storyPointsRef < 0){
        alert("Story points must be greater than zero!");
        return;
    }

    if (confirm("Are you sure you want these choices?")){

        listOfCards[arrIndex]["card"]["_name"] = nameRef;
        listOfCards[arrIndex]["card"]["_type"] = typeRef;
        listOfCards[arrIndex]["card"]["_storyPoints"] = storyPointsRef;
        listOfCards[arrIndex]["card"]["_tag"] = tagRef;
        listOfCards[arrIndex]["card"]["_priority"] = priorityRef;
        listOfCards[arrIndex]["card"]['_assignee'] = assigneeRef;
        listOfCards[arrIndex]["card"]['_description'] = descriptionRef;
        listOfCards[arrIndex]["card"]['_status'] = statusRef;

        savelistOfCards();
        displayCards(); //Display cards
        closeModal(); //Close modal
        document.getElementById("save").onclick = function() {saveCard()};
    }
}


//Functions for adding task to a sprint
function displayAddSprint(cardIndex){

    let sprintOptionsRef = document.getElementById("sprints"); //Reference for sprint options
    let sprintOptionsInner = `<option value="none">--Please choose a sprint--</option>`; //The inner html we will add
    
    //Continue adding all the options
    for (let i=0; i < listOfSprints.length; i++){

        //Ensures we only display sprints which haven't been started
        if (listOfSprints[i]["status"] == 0){
            sprintOptionsInner += `<option value=${[i, cardIndex]}>${listOfSprints[i]["name"]}</option>`;
        }
    }

    //Edit the inner html attributes
    sprintOptionsRef.innerHTML = sprintOptionsInner;

    //Make the form unhidden
    let sprintForm = document.getElementById("add_to_sprint");
    sprintForm.classList.add("show");
}


//Closing the sprint form
function addToSprintClose(){

    //Make the form hidden
    let sprintForm = document.getElementById("add_to_sprint");
    sprintForm.classList.remove("show");
}


//Add a task to a sprint
function addToSprint(){

    let sprintOptionRef = document.getElementById("sprints").value; //Sprint options reference

    //If option picked is default, alert user
    if (sprintOptionRef == "none"){
        alert("Please choose a valid option.");
        return
    }

    //Confirm with the user they want this
    if (confirm("Are you sure with this choice?")){

        //Load the sprints and cards, ensure we use up to date data
        loadlistOfSprints();
        loadlistOfCards();

        //Set the sprint and card index
        let sprintIndex = parseInt(sprintOptionRef[0]);
        let cardIndex = parseInt(sprintOptionRef[2]);

        //Go through all listOfCards until we find a matching card index
        for (let i=0; i<listOfCards.length; i++){

            if (listOfCards[i]["index"] == cardIndex){
                
                //Pop from the index and add it to the sprint list
                task = listOfCards.pop(i);
                if (task["card"]["_status"] == "Not Started"){
                    listOfSprints[sprintIndex]["notStarted"].push(task);
                }
                else if (task["card"]["_status"] == "In Progress"){
                    listOfSprints[sprintIndex]["inProgress"].push(task);
                }
                else if (task["card"]["_status"] == "Completed"){
                    listOfSprints[sprintIndex]["complete"].push(task);
                }
                break;
            }
        }

        //Save data
        savelistOfCards();
        saveListOfSprints();
        displayCards(); //Redisplay cards
        addToSprintClose(); //Close the sprint form
    }
}

function setProductBacklogFilter(option){
    productBacklogFilter = option;
        displayCards();
}
