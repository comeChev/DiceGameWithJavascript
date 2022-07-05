// ---------------------------------------------------------
// IMPORTATIONS
// ---------------------------------------------------------
import diceGame from "./diceGame.js"
// ---------------------------------------------------------
// DECLARATION DES VARIABLES
// ---------------------------------------------------------
const globalBoard = document.querySelector('#globalBoard')
const btnNewGame = document.querySelector('#btnNewGame')
// ---------------------------------------------------------
// EXECUTION DU CODE
// ---------------------------------------------------------

globalBoard.innerHTML=""
const autoGame = new diceGame()
autoGame.startNewGame(modalNewGame)

btnNewGame.addEventListener('click',()=>{
  const newGame = new diceGame()
  newGame.startNewGame(modalNewGame)
})



