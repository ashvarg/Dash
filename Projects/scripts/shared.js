shared.js


"use strict";

// array of cards
let listOfCards = [];

//List of sprints
let listOfSprints = [];

//Card indexes, so it is more reliable
let taskIndexes = {index: 0};

//Sprint index
let sprintIndex = {index:0}


//Local Storage for listOfCards
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

function loadlistOfCards(){
    //get dictionary from storage
    listOfCards = JSON.parse(localStorage.getItem("listOfCards"));
}

//made so we could clear from console when debugging
function clearlistOfCards(){
    localStorage.clear();
    listOfCards = [];
    displayCards();
}


//Local storage for listOfSprints
function saveListOfSprints(){

    if (localStorage.getItem("listOfSprints") == null){
        localStorage.setItem("listOfSprints", JSON.stringify(listOfSprints));
    }

    localStorage.removeItem("listOfSprints");
    //save the new list
    localStorage.setItem("listOfSprints", JSON.stringify(listOfSprints));
}

function loadlistOfSprints(){
    //get dictionary from storage
    listOfSprints = JSON.parse(localStorage.getItem("listOfSprints"));
}

//made so we could clear from console when debugging
function clearlistOfSprints(){
    localStorage.clear();
    listOfSprints = [];
}


//Load Sprint Data
loadlistOfSprints();
if (listOfSprints == null){
    listOfSprints = [];
    saveListOfSprints();
}

function saveTaskIndexes(){

    if (localStorage.getItem("taskIndexes") == null){
        localStorage.setItem("taskIndexes", JSON.stringify(taskIndexes));
    }

    localStorage.removeItem("taskIndexes");
    //save the new list
    localStorage.setItem("taskIndexes", JSON.stringify(taskIndexes));
}

function loadTaskIndexes(){
    //get dictionary from storage
    taskIndexes = JSON.parse(localStorage.getItem("taskIndexes"));
}


//Sprint Index
function saveSprintIndex(){

    if (localStorage.getItem("sprintIndex") == null){
        localStorage.setItem("sprintIndex", JSON.stringify(sprintIndex));
    }

    localStorage.removeItem("sprintIndex");
    //save the new list
    localStorage.setItem("sprintIndex", JSON.stringify(sprintIndex));
}

function loadSprintIndex(){
    //get dictionary from storage
    sprintIndex = JSON.parse(localStorage.getItem("sprintIndex"));
}

function sprintPage(num){

    loadSprintIndex();
    sprintIndex.index = num;
    saveSprintIndex();
    window.location = "sprint.html";
}