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
    let today = new Date().toISOString().substr(0, 10);

    startDate.min = today; 
    endDate.min = today;

    let modal_container = document.getElementById("createSprintForm");
    modal_container.classList.add("show");
}

function createSprintClose(){

    let modal_container = document.getElementById("createSprintForm");
    modal_container.classList.remove("show");
}
