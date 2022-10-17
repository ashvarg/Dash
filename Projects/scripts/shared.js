/* 
    Purpose: a shared file used by every other file, imported by simpy adding script to html file.
    Date Modified: 17/10/2022
    Contributors: Arosh Heenkenda, Ashwin George, Jamie Harrison, Dylan Redman
    Reviewer: Arosh Heenkenda, Ashwin George, Jamie Harrison, Dylan Redman
*/

"use strict";

// array of cards
let listOfCards = [];

//List of sprints
let listOfSprints = [];

//Card indexes, so it is more reliable
let taskIndexes = {index: 0};

//Sprint index
let sprintIndex = {index:0}

//List of Team Members
let listOfTeamMembers = [];

//Track member numbers
let memberIndex = {index: 0}

//Worklog list
let workLog = [];



/**
 * Save card list to local storage.
 */
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


/**
 * Load card list from local storage
 */
function loadlistOfCards(){

    //get dictionary from storage
    listOfCards = JSON.parse(localStorage.getItem("listOfCards"));
}

/**
 * Function to only clear card list data
 */
function clearlistOfCards(){

    localStorage.clear();
    listOfCards = [];
    displayCards();
}


/**
 * Save sprint list to local storage
 */
function saveListOfSprints(){

    if (localStorage.getItem("listOfSprints") == null){
        localStorage.setItem("listOfSprints", JSON.stringify(listOfSprints));
    }

    localStorage.removeItem("listOfSprints");
    //save the new list
    localStorage.setItem("listOfSprints", JSON.stringify(listOfSprints));
}

/**
 * Load sprint list from local storage
 */
function loadlistOfSprints(){

    //get dictionary from storage
    listOfSprints = JSON.parse(localStorage.getItem("listOfSprints"));
}


/**
 * Function to only clear sprint list data
 */
function clearlistOfSprints(){

    localStorage.clear();
    listOfSprints = [];
}

//Load sprint data and create empty array if null
loadlistOfSprints();
if (listOfSprints == null){
    listOfSprints = [];
    saveListOfSprints();
}


/**
 * Save task indexes to local storage
 */
function saveTaskIndexes(){

    if (localStorage.getItem("taskIndexes") == null){
        localStorage.setItem("taskIndexes", JSON.stringify(taskIndexes));
    }

    localStorage.removeItem("taskIndexes");
    //save the new list
    localStorage.setItem("taskIndexes", JSON.stringify(taskIndexes));
}


/**
 * Load task indexes from local storage
 */
function loadTaskIndexes(){

    //get dictionary from storage
    taskIndexes = JSON.parse(localStorage.getItem("taskIndexes"));
}


/**
 * Save sprint indexes in local storage
 */
function saveSprintIndex(){

    if (localStorage.getItem("sprintIndex") == null){
        localStorage.setItem("sprintIndex", JSON.stringify(sprintIndex));
    }

    localStorage.removeItem("sprintIndex");
    //save the new list
    localStorage.setItem("sprintIndex", JSON.stringify(sprintIndex));
}


/**
 * Load sprint indexes from local storage
 */
function loadSprintIndex(){
    //get dictionary from storage
    sprintIndex = JSON.parse(localStorage.getItem("sprintIndex"));
}


/**
 * Load a specific sprint index when loading the sprint page
 * 
 * @param {*} num - index of the sprint we want to save and load
 */
function sprintPage(num){

    loadSprintIndex();
    sprintIndex.index = num;
    saveSprintIndex();
    window.location = "sprint.html";
}


/**
 * Save list of team members to local storage
 */
function savelistOfTeamMembers() {

    if (localStorage.getItem("listOfTeamMembers") == null){
        localStorage.setItem("listOfTeamMembers", JSON.stringify(listOfTeamMembers));
    }

    localStorage.removeItem("listOfTeamMembers");
    localStorage.setItem("listOfTeamMembers", JSON.stringify(listOfTeamMembers));
}


/**
 * Load list of team members from local storage
 */
function loadlistOfTeamMembers(){
    listOfTeamMembers = JSON.parse(localStorage.getItem("listOfTeamMembers"));
}


/**
 * Save member index to local storage
 */
function saveMemberIndex(){

    if (localStorage.getItem("memberIndex") == null){
        localStorage.setItem("memberIndex", JSON.stringify(memberIndex));
    }

    localStorage.removeItem("memberIndex");
    //save the new list
    localStorage.setItem("memberIndex", JSON.stringify(memberIndex));
}


/**
 * Load member index to local storage
 */
function loadMemberIndex(){

    //get dictionary from storage
    memberIndex = JSON.parse(localStorage.getItem("memberIndex"));
}


/**
 * Save worklog to local storage
 */
function saveWorkLog(){

    localStorage.setItem("workLog", JSON.stringify(workLog));
}


/**
 * Load worklog from local storage
 */
function loadWorkLog(){

    if (localStorage.getItem("workLog") == null){

        workLog = [];
        localStorage.setItem("workLog", JSON.stringify(workLog));
    }
    
    workLog = JSON.parse(localStorage.getItem("workLog"));
}