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

        let modal_container = document.getElementById("createSprintForm");
        modal_container.classList.add("show");
}

function createSprintClose(){

    let modal_container = document.getElementById("createSprintForm");
    modal_container.classList.remove("show");
}
