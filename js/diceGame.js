// ---------------------------------------------------------
// IMPORTATIONS
// ---------------------------------------------------------
import gameSettings from "./configGame.js";

// ---------------------------------------------------------
// DECLARATION DE CLASSE
// ---------------------------------------------------------

export default class diceGame{
  constructor(){
    this.gameID=0
    this.players=[];
    this.settings=[];
    this.currentPlayer
  }

  getPlayer=(i)=>{return this.players[i]}
  numberPlayers =()=>{return this.players.length}
  
  startNewGame=(modal)=>{
    modal.show()
    this.gameID += 1
    this.settings = new gameSettings()
    this.settings.initModal()
    this.settings.changeColorBackgroundForm(this.numberPlayers())
    this.settings.changeNumberPlayers(selectNumberPlayers)
    btnCreateGame.addEventListener('click',()=>{
    this.validateSettings(modal)
    this.currentPlayer = randomPlayer(this.numberPlayers())
    this.setFocus(this.currentPlayer,this.numberPlayers())
    console.log(this.currentPlayer)
    document.querySelector(`#keepScoreP${(this.currentPlayer)+1}`).addEventListener('click',()=>{this.keepScore()})
    document.querySelector('#diceButton').addEventListener('click',()=>{this.rollDice()})
    document.querySelector('#btnDiceRoll').addEventListener('click', ()=>{
      this.rollDice()
    })
    })
  }
  
  validateSettings=(modal)=>{
    let nb = this.settings.numberPlayers
    this.settings.addCadrePlayers()
    this.players=[]
    for(let i=1; i<(nb+1) ; i++){
      this.players.push(this.settings.createPlayer(i))
    }
    modal.hide()
    this.initScore()
    btnCreateGame.removeEventListener('click',()=>{
      this.validateSettings(modal)
    })
  }
  // pour initier les scores en début de partie et les afficher
  initScore=()=>{
    for(let i=0; i<this.numberPlayers();i++){
      let player = this.getPlayer(i)
      document.querySelector(`#nameP${i+1}`).innerHTML = `${player.namePlayer}`
      document.querySelector(`#scoreP${i+1}`).innerHTML = `${player.score}/100`
      document.querySelector(`#tempScoreP${i+1}`).innerHTML = player.tempScore
    }
  }
  //pour changer de joueur
  setPlayer =()=>{
    document.querySelector(`#keepScoreP${(this.currentPlayer)+1}`).removeEventListener('click',()=>{this.keepScore()})
    if(this.currentPlayer == (this.numberPlayers())-1){
      this.currentPlayer=0
    } else{
      this.currentPlayer+=1
    }
    this.setFocus(this.currentPlayer,this.numberPlayers())
    document.querySelector(`#keepScoreP${(this.currentPlayer)+1}`).addEventListener('click',()=>{this.keepScore()})
  }
  //pour jouer
  playerPlays=(result)=>{
    let player = this.getPlayer(this.currentPlayer)
    if(result == 1){
      player.tempScore = 0
      player.logGame.push(`${player.namePlayer} a effectué un lancé de ${result}. ${player.namePlayer} passe son tour.`)
      player.showValue(this.currentPlayer)
      this.setPlayer()
      return
    } else{
      player.tempScore += result
      player.logGame.push(`${player.namePlayer} a effectué un lancé de ${result}.`)
      player.logGame.push(`Le score en cours de ${player.namePlayer} est de ${player.tempScore}.`)
      player.showValue(this.currentPlayer)
    }
  }
  setFocus=(currentPlayer,players)=>{
    for (let i = 1; i<=players; i++){
      let cadre = window[`playerCadre${i}`]
      if(cadre.classList.contains('border-player')){
        cadre.classList.remove('border-player')
      }
    }
    let cadreCurrent = window[`playerCadre${currentPlayer+1}`]
    cadreCurrent.classList.add('border-player')
  }
  keepScore=()=>{
  let player = this.getPlayer(this.currentPlayer)
    if(player.tempScore>0){
      player.score += player.tempScore
      player.tempScore=0
      player.logGame.push(`${player.namePlayer} a choisi de garder son score de ${player.tempScore}.`)
      player.logGame.push(`Le score total de ${player.namePlayer} est de ${player.score}. Plus que ${100-player.score} points.`)
      player.showValue(this.currentPlayer)
      this.setPlayer()
      return
    }
  }
  rollDice=()=>{
    let btnDice = document.querySelector('#diceButton')
    btnDice.classList.toggle('roll-dice1')
    setTimeout(() => {
      let diceResult = randomDice(6);
      document.querySelector('#diceButton').innerHTML = diceResult
      this.playerPlays(diceResult)
      btnDice.classList.toggle('roll-dice1')
      console.log(btnDice.classList)
    }, 1000);
  }
}
// ---------------------------------------------------------
// DECLARATION DES VARIABLES LOCALES
// ---------------------------------------------------------

let randomPlayer=(numberPlayers)=>{
  return Math.floor(Math.random() * (numberPlayers))
}
let randomDice=(dice)=>{
  return Math.floor(Math.random() * (dice) + 1)
}

