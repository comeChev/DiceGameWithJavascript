// ---------------------------------------------------------
// IMPORTATIONS
// ---------------------------------------------------------
import diceGame from "./diceGame.js"
// ---------------------------------------------------------
// DECLARATION DES VARIABLES
// ---------------------------------------------------------
const globalBoard = document.querySelector('#globalBoard')
const btnNewGame = document.querySelector('#btnNewGame')
const btnHowToPlay = document.querySelector('#btnRules')
const btnCloseRules = document.querySelector('#btnCloseRules')
const modalHowtoPlay = new bootstrap.Modal(document.querySelector('#modalHowToPlay'))
const navBar = document.querySelector('.navbar-collapse')
// ---------------------------------------------------------
// EXECUTION DU CODE
// ---------------------------------------------------------

globalBoard.innerHTML=""
const autoGame = new diceGame()
autoGame.startNewGame(modalNewGame)
btnNewGame.addEventListener('click',()=>{
  const newGame = new diceGame()
  newGame.startNewGame(modalNewGame)
  setTimeout(() => {
    navBar.classList.remove('show')
  }, 300);
})
btnHowToPlay.addEventListener('click',()=>{
  modalHowtoPlay.show();
  setTimeout(() => {
    navBar.classList.remove('show')
  }, 300);
})
btnCloseRules.addEventListener('click',()=>{modalHowtoPlay.hide()})



