"use strict";

// array of cards
let listOfCards = [];

//List of sprints
let listOfSprints = [];


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