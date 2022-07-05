// ---------------------------------------------------------
// DECLARATION DE FUNCTION A EXPORTER
// ---------------------------------------------------------

export default function endGame(modalGame,players,playerName,nbPlayer,arrayPlayers){
  let modalEndGame = new bootstrap.Modal(document.querySelector('#modalEndGame'))
  // on cache le cadre current score
  for (let i = 1; i<=players; i++){
  let currentScoreCadre = window[`currentScoreP${i}`]
  currentScoreCadre.setAttribute('style','opacity:0')
  }
  // on désactive les boutons rollDice
  let btnDice =document.querySelector('#btnDiceRoll')
  let dice = document.querySelector('#diceButton')
  if(window.matchMedia("(min-width : 991px)")){
    btnDice.classList.add('d-none')
  }
  dice.classList.toggle('d-none')
  // on enlève le cadre du focus
  let cadre = document.querySelector(`#playerCadre${nbPlayer.idPlayer}`)
  cadre.classList.toggle('border-player')
  // on affiche un message de victoire
  victoryMessage(playerName)
  setTimeout(() => {
    victoryMessageAppear()
    createTableStat(players, arrayPlayers)
  }, 20);
  // on affice la modale de fin de partie après un setTimeOut
  setTimeout(() => {
    modalEndGame.show()
    document.querySelector('#btnCreateNewGame').innerText = "Commencer une nouvelle partie" 
    document.querySelector('#btnCreateNewGame').addEventListener('click',()=>{
      modalGame.show();
      modalEndGame.hide();
    })
  }, 3000);  
}

export function statistics(players, arrayPlayers){
  let modalEndGame = new bootstrap.Modal(document.querySelector('#modalEndGame'))
  createTableStat(players, arrayPlayers)
  document.querySelector('.modal-title').innerText = "Statistiques de la partie"
  modalEndGame.show()
  document.querySelector('#btnCreateNewGame').innerText = "Continuer la partie"
  document.querySelector('#btnCreateNewGame').addEventListener('click',()=>{
    modalEndGame.hide();
  })
}

// ---------------------------------------------------------
// DECLARATION DES VARIABLES LOCALES
// ---------------------------------------------------------

let victoryMessage=(playerName)=>{
  let globalBoard = document.querySelector('#globalBoard')
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
  console.log(arrayPlayer)
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
  let tBody = document.querySelector('#tBody')
  tBody.innerHTML=""
  for(let i=0; i<players;i++){
    createTablePlayer(arrayPlayers[i], tBody)
  }
  sortArray()
}

let sortArray=()=>{
  let table, rows, switching, i, x, y, a, b, shouldSwitch;
  table = document.querySelector("#tBody");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 0; i < (rows.length-1); i++) {
      shouldSwitch = false;
      x = rows[i].querySelector('.score');
      y = rows[i + 1].querySelector('.score');
      a = rows[i].querySelector('.place')
      b = rows[i + 1].querySelector('.place')
      //check if the two rows should switch place:
      console.log(parseInt(x.innerText))
      console.log(parseInt(y.innerText))
      
      
      if (parseInt(x.innerText) < parseInt(y.innerText)) {
        //if so, mark as a switch and break the loop:
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
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
