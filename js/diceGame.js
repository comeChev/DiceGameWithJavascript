// ---------------------------------------------------------
// IMPORTATIONS
// ---------------------------------------------------------

import gameSettings from "./configGame.js";
import gamePlayer from "./diceGamePlayer.js";

// ---------------------------------------------------------
// DECLARATION DE CLASSE
// ---------------------------------------------------------

export default class diceGame{
  constructor(){
    this.gameID
    this.players=[];
    this.settings=[];
  }

  startNewGame=(modal,lgMediaQuery,mdMediaQuery)=>{
    modal.show()
    this.settings = new gameSettings()
    console.log(this.settings.numberPlayers)
    this.settings.changeColorBackgroundForm(this.settings.numberPlayers)
    this.settings.changeNumberPlayers(selectNumberPlayers)
    btnCreateGame.addEventListener('click',()=>{
      this.settings.addCadrePlayers(globalBoard,lgMediaQuery,mdMediaQuery)
      let numberPlayer = this.settings.numberPlayers
      for(let i=1; i<(numberPlayer+1) ; i++){
        this.players.push(this.settings.createPlayer(i))
      }
      modal.hide()
      this.initScore()
    })
  }

  // pour initier les scores en début de partie et les afficher
  initScore=()=>{
  for(let i=0; i<this.players.length;i++){
    let player = this.players[i]
    document.querySelector(`#nameP${i+1}`).innerHTML = player.namePlayer
    document.querySelector(`#scoreP${i+1}`).innerHTML = player.score
    document.querySelector(`#tempScoreP${i+1}`).innerHTML = player.tempScore
  }
  }
  // pour choisir aléatoirement qui commencera la partie
  chooseStarter=()=>{
    let 
  }
}


// ---------------------------------------------------------
// DECLARATION DES VARIABLES LOCALES
// ---------------------------------------------------------

let randomNumberPlayer=(numberPlayer)=>{
  return Math.floor(Math.random() * (numberPlayer - 1 + 1) + 1)
} 