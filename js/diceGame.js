// ---------------------------------------------------------
// IMPORTATIONS
// ---------------------------------------------------------
import gameSettings from "./configGame.js";
import endGame, { statistics } from "./endGame.js";

const btnCloseGame = document.querySelector('#btnCloseGame')
const btnCreateGame = document.querySelector('#btnCreateGame')
const modalNewGame = new bootstrap.Modal(document.querySelector("#modalNewGame"));

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
  data=()=>{return this.players}
  
  // pour démarrer la partie
  startNewGame=()=>{
    modalNewGame.show()
    this.gameID += 1
    this.settings = new gameSettings()
    this.settings.initModal()
    this.settings.changeNumberPlayers(selectNumberPlayers)
    btnCreateGame.addEventListener('click',()=>{
      this.validateSettings()
      this.currentPlayer = randomPlayer(this.numberPlayers())
      this.setFocus(this.currentPlayer,this.numberPlayers())
      document.querySelector(`#keepScoreP${(this.currentPlayer)+1}`).addEventListener('click',()=>{this.keepScore()})
      document.querySelector('#diceButton').addEventListener('click',()=>{this.rollDice()})
      document.querySelector('#btnDiceRoll').addEventListener('click', ()=>{
      this.rollDice()
    })
    })
    btnCloseGame.addEventListener('click', ()=>modalNewGame.hide())
    document.querySelector('#btnResult').addEventListener('click', ()=>{
      this.showStatistics()
    })
  }
  // pour valider les réglagles (nombres de joueurs, couleurs etc...)
  validateSettings=()=>{
    let nb = this.settings.numberPlayers
    this.settings.addCadrePlayers()
    this.players=[]
    for(let i=1; i<(nb+1) ; i++){
      this.players.push(this.settings.createPlayer(i))
    }
    modalNewGame.hide()
    this.initScore()
    btnCreateGame.removeEventListener('click',()=>{
      this.validateSettings(modalNewGame)
    })
    console.log(this.players[1].dataPlayer)
  }
  // pour initier les scores en début de partie et les afficher
  initScore=()=>{
    for(let i=0; i<this.numberPlayers();i++){
      let player = this.getPlayer(i)
      player.showValue(i,this.settings.victoryPoints)
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
      player.dataPlayer.nb1 += 1
      player.dataPlayer.nbRollDice += 1
      player.dataPlayer.nbTurn +=1
      player.logGame.push(`${player.namePlayer} a effectué un lancé de ${result}. ${player.namePlayer} passe son tour.`)
      player.showValue(this.currentPlayer, this.settings.victoryPoints)
      this.setPlayer()
      return
    } else{
      player.tempScore += result
      player.dataPlayer.nbRollDice += 1
      player.logGame.push(`${player.namePlayer} a effectué un lancé de ${result}.`)
      player.logGame.push(`Le score en cours de ${player.namePlayer} est de ${player.tempScore}.`)
      player.showValue(this.currentPlayer, this.settings.victoryPoints)
    }
  }
  // pour modifier le focus du joueur
  setFocus=(currentPlayer,players)=>{
    for (let i = 1; i<=players; i++){
      let cadre = window[`playerCadre${i}`]
      if(cadre.classList.contains('border-player')){
        cadre.classList.remove('border-player')
      }
      let keepButton = window[`keepScoreP${i}`]
      if(!keepButton.classList.contains('d-none')){
        keepButton.classList.add('d-none')
      }
    }
    let cadreCurrent = window[`playerCadre${currentPlayer+1}`]
    let keepButtonCurrent = window[`keepScoreP${currentPlayer+1}`]
    cadreCurrent.classList.add('border-player')
    keepButtonCurrent.classList.remove('d-none')
  }
  // pour conserver le score temporaire et le garder dans le score global
  keepScore=()=>{
  let player = this.getPlayer(this.currentPlayer)
    if(player.tempScore>0){
      player.score += player.tempScore
      player.dataPlayer.nbPointsTurn += player.tempScore
      player.tempScore=0
      player.dataPlayer.nbTurn +=1
      player.logGame.push(`${player.namePlayer} a choisi de garder son score de ${player.tempScore}.`)
      player.logGame.push(`Le score total de ${player.namePlayer} est de ${player.score}. Plus que ${this.settings.victoryPoints-player.score} points.`)
      player.showValue(this.currentPlayer,this.settings.victoryPoints)
      if(player.score >= this.settings.victoryPoints){
        let majPlayer = player.namePlayer.toUpperCase()
        let players = this.players
        endGame(modalNewGame,this.numberPlayers(),majPlayer,player,this.players)
        return
      }
      this.setPlayer()
      return
    }
  }
  // pour lancer le dé (animation et nombre aléatoire)
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
  //pour voir les statistiques en cours
  showStatistics=()=>{
    statistics(this.numberPlayers(),this.players)
  }
  
}
// ---------------------------------------------------------
// DECLARATION DES VARIABLES LOCALES
// ---------------------------------------------------------

// pour choisir un joueur aléatoire qui commence la partie
let randomPlayer=(numberPlayers)=>{
  return Math.floor(Math.random() * (numberPlayers))
}
// pour choisir un nombre aléatoire
let randomDice=(dice)=>{
  return Math.floor(Math.random() * (dice) + 1)
}

