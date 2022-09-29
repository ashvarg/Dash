"use strict";

function toggleViewLabel(){
    
    //Get the inner html
    let toggleText = document.getElementById("toggleLabel");

    //Switch the text value depending on what is there
    if (toggleText.textContent == "Kanban"){
        //Switch to Chart
        toggleText.innerHTML = "Chart";
    }
    else if(toggleText.textContent == "Chart"){
        //Switch to Kanban
        toggleText.innerHTML = "Kanban";
    }

}


function createSprint(){

    let startDate = document.getElementById("startDate");
    let endDate = document.getElementById("endDate");
    let sprintName = document.getElementById("newSprintName");
    let today = new Date().toISOString().substr(0, 10);

    startDate.min = today; 
    endDate.min = today;

    startDate.value = "yyyy-MM-dd";
    endDate.value = "yyyy-MM-dd";
    sprintName.value = "";

    let modal_container = document.getElementById("createSprintForm");
    modal_container.classList.add("show");
}

function createSprintClose(){

    let modal_container = document.getElementById("createSprintForm");
    modal_container.classList.remove("show");
}

function saveSprintDetails(){

    loadlistOfSprints();
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;
    let sprintName = document.getElementById("newSprintName").value;

    if (sprintName=="" | endDate < startDate){
        alert("Please ensure all fields are correct")
        return
    }

    if (confirm('Are you sure you want these choices?')){

        let sprintData = {"name": sprintName, "start": startDate, "end": endDate, "notStarted": [], "inProgress": [], "complete":[]};

        listOfSprints.push(sprintData);
    
        createSprintClose();
        updateSprintList();
        saveListOfSprints();
    }

}

function updateSprintList(){

    loadlistOfSprints();
    if (listOfSprints == null){
        return
    }

    let sprintOptionsRef = document.getElementById("sprintOptions");
    let sprintOptionsOutput = `<select class="sprintInput" type="text" id="sprints">
                                    <option value="">--Please choose a sprint--</option>`;

    for (let i=0; i<listOfSprints.length; i++){

        sprintOptionsOutput += `<option value=${i}>${listOfSprints[i]["name"]}</option>`;
    }

    sprintOptionsOutput += `</select>`;
    sprintOptionsRef.innerHTML = sprintOptionsOutput;
    saveListOfSprints();

}

function onLoadSprintLog(){
    loadlistOfSprints();
    if (listOfSprints == null){
        listOfSprints = [];
        saveListOfSprints();
    }
    updateSprintList();
}