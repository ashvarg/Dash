"use strict";

function toggleViewLabel(){
    
    //Get the inner html
    let toggleText = document.getElementById("toggleLabel");
    
    //Switch the text value depending on what is there
    if (toggleText.textContent == "Kanban"){
        toggleText.innerHTML = "Chart";
    }
    else if(toggleText.textContent == "Chart"){
        toggleText.innerHTML = "Kanban";
    }

}
