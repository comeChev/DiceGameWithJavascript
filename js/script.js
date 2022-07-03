
/* MEDIA QUERY BOOTSTRAP 
small 576px
medium 768pc
large 992px */
// ---------------------------------------------------------
// IMPORTATIONS
// ---------------------------------------------------------

import diceGame from "./diceGame.js"

// ---------------------------------------------------------
// DECLARATION DES VARIABLES MEDIAQUERIES
// ---------------------------------------------------------
const smMediaQuery = window.matchMedia("(min-width: 576px)")
const mdMediaQuery = window.matchMedia("(min-width: 768px)")
const lgMediaQuery = window.matchMedia("(min-width: 992px)")
const underLgMediaQuery = window.matchMedia("(max-width : 991px)")

// ---------------------------------------------------------
// DECLARATION DES VARIABLES
// ---------------------------------------------------------
const globalBoard = document.querySelector('#globalBoard')
const logListP1 = document.querySelector('#logP1')
const logListP2 = document.querySelector('#logP2')
/*
const btnLogP1 = document.querySelector('#btnHideLogP1')
const btnLogP2 = document.querySelector('#btnHideLogP2')
const btnLogP3 = document.querySelector('#btnHideLogP3')
const btnLogP4 = document.querySelector('#btnHideLogP4')
*/
const logAreaP1 = document.querySelector("#logAreaP1")
const logAreaP2 = document.querySelector("#logAreaP2")
const p1Board = document.querySelector('#p1Board')
const diceButton = document.querySelector('#diceButton')
const btnCloseGame = document.querySelector('#btnCloseGame')
const btnCreateGame = document.querySelector('#btnCreateGame')
const modalNewGame = new bootstrap.Modal(document.querySelector("#modalNewGame"));
const btnNewGame = document.querySelector('#btnNewGame')
const selectNumberPlayers = document.querySelector('#selectNumberPlayers')
// ---------------------------------------------------------
// DECLARATION DES FONCTIONS
// ---------------------------------------------------------

// pour générer un nombre aléatoire suivant le nombre de faces du dé


let listeners=()=>{
  /*
  lgMediaQuery.addEventListener('change', ()=>{
    showLogBtn(btnLogP1)
    showLogBtn(btnLogP2)
    changeOrderDiv(p1Board)
  })
  //btnLogP1.addEventListener("click",()=> hideLog(logListP1))
  //btnLogP2.addEventListener("click",()=> hideLog(logListP2))
  
  btnNewGame.addEventListener('click',()=> modalNewGame.show())
  btnCloseGame.addEventListener('click',()=> modalNewGame.hide())
  
  underLgMediaQuery.addEventListener('change', ()=>changeNumberPlayerCadre())
  diceButton.addEventListener('click',()=> randomNumber(6))
  */
}
let loadPage =()=>{
  if (!lgMediaQuery.matches){
    //showLogBtn(btnLogP1)
    //showLogBtn(btnLogP2)
  }
}



// ---------------------------------------------------------
// EXECUTION DU CODE
// ---------------------------------------------------------

window.onload =()=>{
  globalBoard.innerHTML=""
  let game1 = new diceGame()
  game1.id = 1
  game1.startNewGame(modalNewGame,lgMediaQuery,mdMediaQuery)
}
