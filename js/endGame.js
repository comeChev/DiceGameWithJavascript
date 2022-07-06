// ---------------------------------------------------------
// DECLARATION DES VARIABLES
// ---------------------------------------------------------

const btnDice =document.querySelector('#btnDiceRoll')
const dice = document.querySelector('#diceButton')
const lgMediaQuery = window.matchMedia("(min-width : 991px)")
const modalEndGame = new bootstrap.Modal(document.querySelector('#modalEndGame'))
const btnCreateNewGame = document.querySelector('#btnCreateNewGame')
const globalBoard = document.querySelector('#globalBoard')
const tBody = document.querySelector('#tBody')

// ---------------------------------------------------------
// DECLARATION DE FUNCTION A EXPORTER
// ---------------------------------------------------------

export default function endGame(modalGame,players,playerName,nbPlayer,arrayPlayers){
  const modalEndGame = new bootstrap.Modal(document.querySelector('#modalEndGame'))
  // on cache le cadre current score
  for (let i = 1; i<=players; i++){
    let currentScoreCadre = window[`currentScoreP${i}`]
    currentScoreCadre.setAttribute('style','opacity:0')
  }
  // on désactive les boutons rollDice
  if(lgMediaQuery){btnDice.classList.add('d-none')}
  dice.classList.toggle('d-none')
  // on enlève le cadre du focus
  let cadre = document.querySelector(`#playerCadre${nbPlayer.idPlayer}`)
  cadre.classList.toggle('border-player')
  // on affiche un message de victoire
  victoryMessage(playerName)
  setTimeout(() => {
    victoryMessageAppear()
    createTableStat(players, arrayPlayers)
  }, 200);
  // on affice la modale de fin de partie après un setTimeOut
  setTimeout(() => {
    modalEndGame.show()
    document.querySelector('#btnCreateNewGame').innerText = "Commencer une nouvelle partie" 
    document.querySelector('#btnCreateNewGame').addEventListener('click',()=>{
      modalGame.show();
      modalEndGame.hide();
    })
  }, 2500);  
}

export function statistics(players, arrayPlayers){
  createTableStat(players, arrayPlayers)
  document.querySelector('.modal-title').innerText = "Statistiques de la partie"
  modalEndGame.show()
  btnCreateNewGame.innerText = "Continuer la partie"
  btnCreateNewGame.addEventListener('click',()=>{
    modalEndGame.hide();
  })
}

// ---------------------------------------------------------
// DECLARATION DES VARIABLES LOCALES
// ---------------------------------------------------------

let victoryMessage=(playerName)=>{
  let div=document.createElement('div')
  div.setAttribute('id', 'victoryMessage')
  div.classList.add('victoryCadre', 'position-absolute', 'translate-middle')
  div.innerHTML = `<p> 🎉 🎉 VICTOIRE DE ${playerName} 🎉 🎉 </p>`
  globalBoard.appendChild(div)
}
// transition pour faire apparaître le message
let victoryMessageAppear=()=>{
  let victoryMessage = document.querySelector('.victoryCadre')
  victoryMessage.classList.toggle('moveVC')
}
// pour créer une ligne du tableau de statistiques
let createTablePlayer=(arrayPlayer, tBody)=>{
  let data = arrayPlayer.dataPlayer
  let pointsPerTurn = 0
  if(!data.nbTurn == 0){
    pointsPerTurn = data.nbPointsTurn / data.nbTurn
  }
  let tr = document.createElement('tr')
  tr.innerHTML = `
    <th scope="row" class="place">${arrayPlayer.idPlayer}</th>
    <td>${arrayPlayer.namePlayer}</td>
    <td class="score">${arrayPlayer.score}</td>
    <td>${data.nbTurn}</td>
    <td>${data.nbRollDice}</td>
    <td>${data.nb1}</td>
  `
  tBody.appendChild(tr)
}
// pour créer l'ensemble du tableau de statistiques en fonction du nombre de joueurs
let createTableStat=(players,arrayPlayers)=>{
  tBody.innerHTML=""
  for(let i=0; i<players;i++){
    createTablePlayer(arrayPlayers[i], tBody)
  }
  sortArray()
}
// pour trier automatiquement le tableau en fonction des scores
let sortArray=()=>{
  let rows, switching, i, x, y, a, b, shouldSwitch;
  switching = true;
  while (switching) {
    switching = false;
    rows = tBody.rows;
    for (i = 0; i < (rows.length-1); i++) {
      shouldSwitch = false;
      x = rows[i].querySelector('.score');
      y = rows[i + 1].querySelector('.score');
      a = rows[i].querySelector('.place')
      b = rows[i + 1].querySelector('.place')
      if (parseInt(x.innerText) < parseInt(y.innerText)) {
        a.innerText = (i+1)+1 //2ème
        b.innerText = (i+1)   //1er
        shouldSwitch = true;
        break;
      }else{
        a.innerText = (i+1)   //1er
        b.innerText = (i+1)+1 //2ème
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
