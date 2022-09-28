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

    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;
    let sprintName = document.getElementById("newSprintName").value;

    let sprintData = {"name": sprintName, "start": startDate, "end": endDate};

    listOfSprints.push(sprintData);
    console.log(sprintData)

    createSprintClose()
}
