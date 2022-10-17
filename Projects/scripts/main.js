/* 
    Purpose: main file that links to index.html
    Date Modified: 17/10/2022
    Contributors: Arosh Heenkenda, Ashwin George, Jamie Harrison, Dylan Redman
    Reviewer: Arosh Heenkenda, Ashwin George, Jamie Harrison, Dylan Redman
*/

"use strict";

let productBacklogFilter = "All"; //options are All, UI, Core, Testing

/**
 * Load local storage data on page load.
 */
function onLoadProductBacklog(){

    //Load list of cards
    loadlistOfCards()
    if (listOfCards == null){
        listOfCards = [];
        savelistOfCards()
    }

    //Display cards
    displayCards()

    //Load task index
    loadTaskIndexes();
    if (taskIndexes == null){
        taskIndexes = {index: 0};
        saveTaskIndexes();
    }

    //Load team members
    loadlistOfTeamMembers();
    if (listOfTeamMembers == null){
        listOfTeamMembers = [];
        savelistOfTeamMembers();
    }

    //Load member index
    loadMemberIndex();
    if (memberIndex == null){
        memberIndex = {index: 0};
        saveMemberIndex();
    }    
}


/**
 * Open the modal to create a task
 */
function openModal(){

    //Get modal container ref
    let modal_container = document.getElementById("modal_container");
    modal_container.classList.add("show");

    //Ref of all required elements
    let nameRef = document.getElementById("newTaskName");
    let typeRef = document.getElementById("newType");
    let storyPointsRef = document.getElementById("newStoryPoints");
    let tagRef = document.getElementById("newTag");
    let priorityRef = document.getElementById("newPriority");
    let assigneeRef = document.getElementById("newAssignee");
    let descriptionRef = document.getElementById("newDescription");

    //Assignee lists
    let assigneeOuput = `<option disabled="disabled" value="">Choose Assignee:</option>`;
    for (let i=0; i < listOfTeamMembers.length; i++){

        assigneeOuput += `<option value="${listOfTeamMembers[i].index}" >${listOfTeamMembers[i].member.name}</option>`;
    }
    assigneeRef.innerHTML = assigneeOuput;

    //Clear values from all these elements
    nameRef.value = "";
    storyPointsRef.value = "";
    tagRef.value = "";
    priorityRef.value = "";
    assigneeRef.value = "";
    descriptionRef.value = "";
}


/**
 * Close modal to create task
 */
function closeModal(){

    let modal_container = document.getElementById("modal_container");
    modal_container.classList.remove("show");
}


/**
 * Save the created task
 * 
 * @returns returns nothing, only returns if incorrect input is entered
 */
function saveCard(){

    //Load list of cards
    loadlistOfCards()

    //Get required references
    let nameRef = document.getElementById("newTaskName").value;
    let typeRef = document.getElementById("newType").value;
    let storyPointsRef = document.getElementById("newStoryPoints").value;
    let tagRef = document.getElementById("newTag").value;
    let priorityRef = document.getElementById("newPriority").value;
    let assigneeRef = document.getElementById("newAssignee").value;
    let descriptionRef = document.getElementById("newDescription").value;

    //Create temporary task
    let tempTask = new task(nameRef, typeRef, storyPointsRef, tagRef, priorityRef, assigneeRef, descriptionRef, "Not Started");

    //Checks to see that none of the fields are empty
    if (tempTask.name=="" || tempTask.type=="" || tempTask.storyPoints=="" || tempTask.tag=="" || tempTask.priority=="" || tempTask.assignee=="" || tempTask.description==""){
        alert("Ensure all fields are filled!");
        return;
    }

    //Ensure story points are not below 0
    if (tempTask.storyPoints < 0){
        alert("Story points must be a greater than zero!");
        return;
    }

    //Confirmation of changes will create the task
    if (confirm("Are you sure you want these choices?")){

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


/**
 * Display the cards on the Html page
 */
function displayCards(){

    //Initialise holding container ref and output
    let cardWrapperRef = document.getElementById("card_wrap");
    let cardWrapperOutput = ``;

    loadlistOfCards()

    //if list is not empty
    //if no filter is selected, display all cards
    if (productBacklogFilter == "All"){
        for (let i=0; i<listOfCards.length; i++) {

            let priorityColour = ``
            // Changing text colour
            if (listOfCards[i]["card"]['_priority'] == "Low"){
                priorityColour = `style="color:lightgreen;"`;
            }
            else if (listOfCards[i]["card"]['_priority'] == "Medium"){
                priorityColour = `style="color:orange;"`;
            }
            else if (listOfCards[i]["card"]['_priority'] == "High"){
                priorityColour = `style="color:red;"`;
            }

            cardWrapperOutput += `
            <div class="card_item">
                <div class="card_inner"> 
                    <div class="name"> <h5>${listOfCards[i]["card"]['_name']}</h5> </div>
                    <div id = "priorityColour" class="priority" ${priorityColour}> <i class="fa-solid fa-triangle-exclamation fa-xl"></i> <h3>${listOfCards[i]["card"]['_priority']}</h3> </div>
                    <div class="tag"> <i class="fa-solid fa-tag fa-xl"></i> <h3>${listOfCards[i]["card"]['_tag']}</h3> </div>
                    <div class="storyPoints"> <i class="fa-solid fa-coins fa-xl"></i> <h3>${listOfCards[i]["card"]['_storyPoints']}</h3> </div>

                    <div class="card_foot">
                        <div>
                            <button title="Edit Task" type="button" class="editButton" onclick="editCard(${listOfCards[i]["index"]})"> <i class="fa-solid fa-pen-to-square fa-lg"></i> </button>
                        </div>
                        <div>
                            <button title="View Task" type="button" class="viewButton" onclick="viewCard(${listOfCards[i]["index"]})"> <i class="fa-solid fa-bars fa-lg"></i> </button>
                        </div>
                        <div>
                            <button title="Delete Task" type="button" class="deleteButton" onclick="deleteCard(${listOfCards[i]["index"]})"> <i class="fa-solid fa-trash-can fa-lg"></i> </button>
                        </div>
                    </div>
                </div>
            </div>`
        }
    }
    else{
        for (let i=0; i<listOfCards.length; i++) {
            if (listOfCards[i]["card"]['_tag'] == productBacklogFilter){

                let priorityColour = ``
                // Changing text colour
                if (listOfCards[i]["card"]['_priority'] == "Low"){
                    priorityColour = `style="color:lightgreen;"`;
                }
                else if (listOfCards[i]["card"]['_priority'] == "Medium"){
                    priorityColour = `style="color:orange;"`;
                }
                else if (listOfCards[i]["card"]['_priority'] == "High"){
                    priorityColour = `style="color:red;"`;
                }

                cardWrapperOutput += `
                <div class="card_item">
                    <div class="card_inner"> 
                        <div class="name"> <h5>${listOfCards[i]["card"]['_name']}</h5> </div>
                        <div id = "priorityColour" class="priority" ${priorityColour}> <i class="fa-solid fa-triangle-exclamation fa-xl"></i> <h3>${listOfCards[i]["card"]['_priority']}</h3> </div>
                        <div class="tag"> <i class="fa-solid fa-tag fa-xl"></i> <h3>${listOfCards[i]["card"]['_tag']}</h3> </div>
                        <div class="storyPoints"> <i class="fa-solid fa-coins fa-xl"></i> <h3>${listOfCards[i]["card"]['_storyPoints']}</h3> </div>

                        <div class="card_foot">
                            <div>
                                <button title="Edit Task" type="button" class="editButton" onclick="editCard(${listOfCards[i]["index"]})"> <i class="fa-solid fa-pen-to-square fa-lg"></i> </button>
                            </div>
                            <div>
                                <button title="View Task" type="button" class="viewButton" onclick="viewCard(${listOfCards[i]["index"]})"> <i class="fa-solid fa-bars fa-lg"></i> </button>
                            </div>
                            <div>
                                <button title="Delete Task" type="button" class="deleteButton" onclick="deleteCard(${listOfCards[i]["index"]})"> <i class="fa-solid fa-trash-can fa-lg"></i> </button>
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


/**
 * View details of a task.
 * 
 * @param {*} cardIndex - the index of the card we want to display details for
 */
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
    descriptionRef.innerHTML = theTask["_description"];
    statusRef.innerHTML = theTask["_status"];

    //Need to display assignee as well
    let member = parseInt(theTask["_assignee"]) //Convert to number
    for (let i=0; i < listOfTeamMembers.length; i++){

        if (listOfTeamMembers[i].index == member){
            assigneeRef.innerHTML = listOfTeamMembers[i].member.name;
            break;
        }
    }

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


/**
 * Close the modal
 */
function closeView(){

    let modal_view = document.getElementById("modal_view");
    modal_view.classList.remove("show");
}


/**
 * Function to edit a task
 * 
 * @param {*} listIndex - the list index which matches the card index
 */
function editCard(listIndex){

    //Load list of cards
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

    //Get required references
    let nameRef = document.getElementById("newTaskName");
    let typeRef = document.getElementById("newType");
    let storyPointsRef = document.getElementById("newStoryPoints");
    let tagRef = document.getElementById("newTag");
    let priorityRef = document.getElementById("newPriority");
    let assigneeRef = document.getElementById("newAssignee");
    let descriptionRef = document.getElementById("newDescription");

    //Modal reference
    let modal_container = document.getElementById("modal_container");
    modal_container.classList.add("show");

    //Change value of this
    nameRef.value = theCard["_name"];
    typeRef.value = theCard["_type"];
    storyPointsRef.value = theCard["_storyPoints"];
    tagRef.value = theCard["_tag"];
    priorityRef.value = theCard["_priority"];
    assigneeRef.value = theCard["_assignee"];
    descriptionRef.value = theCard["_description"];

    //Displays that information and allows the user to edit it\
    document.getElementById("save").onclick = function() {saveEdit(arrIndex)};
}


/**
 * Delete a task
 * 
 * @param {*} listIndex - list index which matches with the card index
 */
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


/**
 * Save a task edit
 * 
 * @param {*} arrIndex - array index we are saving to
 * @returns - returns nothing, and only if a value is invalid
 */
function saveEdit(arrIndex){

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

        listOfCards[arrIndex]["card"]["_name"] = nameRef;
        listOfCards[arrIndex]["card"]["_type"] = typeRef;
        listOfCards[arrIndex]["card"]["_storyPoints"] = storyPointsRef;
        listOfCards[arrIndex]["card"]["_tag"] = tagRef;
        listOfCards[arrIndex]["card"]["_priority"] = priorityRef;
        listOfCards[arrIndex]["card"]['_assignee'] = assigneeRef;
        listOfCards[arrIndex]["card"]['_description'] = descriptionRef;

        savelistOfCards();
        displayCards(); //Display cards
        closeModal(); //Close modal
        document.getElementById("save").onclick = function() {saveCard()};
    }
}


/**
 * Set the product backlog filter
 * 
 * @param {*} option - the option we want to filter by
 */
function setProductBacklogFilter(option){

    productBacklogFilter = option;
    displayCards();
}