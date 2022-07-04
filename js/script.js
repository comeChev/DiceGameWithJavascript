
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
const modalNewGame = new bootstrap.Modal(document.querySelector("#modalNewGame"));
const btnNewGame = document.querySelector('#btnNewGame')
const btnCloseGame = document.querySelector('#btnCloseGame')

const logListP1 = document.querySelector('#logP1')
const logListP2 = document.querySelector('#logP2')
const logAreaP1 = document.querySelector("#logAreaP1")
const logAreaP2 = document.querySelector("#logAreaP2")
const p1Board = document.querySelector('#p1Board')


const selectNumberPlayers = document.querySelector('#selectNumberPlayers')
// ---------------------------------------------------------
// DECLARATION DES FONCTIONS
// ---------------------------------------------------------




// ---------------------------------------------------------
// EXECUTION DU CODE
// ---------------------------------------------------------

window.onload =()=>{
  globalBoard.innerHTML=""
}
let game1 = new diceGame()
game1.startNewGame(modalNewGame)


btnNewGame.addEventListener('click',()=>{
  let newGame = new diceGame()
  newGame.startNewGame(modalNewGame)
})

btnCloseGame.addEventListener('click',()=>modalNewGame.hide())


