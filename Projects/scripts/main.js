"use strict";

import {taskClass} from './taskClass.js';
// array of cards

listOfCards = [];

// just for opening the card into card view 
function openCard(){
    document.getElementById("myCard").style.display = "block";
}

function closeCard(){
    document.getElementById("myCard").style.display = "none";
    
}