export default function endGame(modalGame,players,player){
  let modalEndGame = new bootstrap.Modal(document.querySelector('#modalEndGame'))
  // on cache le cadre current score
  for (let i = 1; i<=players; i++){
  let currentScoreCadre = window[`currentScoreP${i}`]
      if(!currentScoreCadre.classList.contains('d-none')){
        currentScoreCadre.classList.add('d-none')
      }
  }
  // on désactive les boutons rollDice
  let btnDice =document.querySelector('#btnDiceRoll')
  let btnDiceClone = btnDice.cloneNode(true)
  let dice = document.querySelector('#diceButton')
  let diceClone = dice.cloneNode(true)
  btnDice.parentNode.replaceChild(btnDiceClone,btnDice)
  dice.parentNode.replaceChild(diceClone,dice)

  // on affiche un message de victoire
  victoryMessage(player)
  setTimeout(() => {
    victoryMessageAppear()
  }, 20);
  // on affice la modale de fin de partie après un setTimeOut
  setTimeout(() => {
    modalEndGame.show()  
    document.querySelector('#btnCreateNewGame').addEventListener('click',()=>{
      modalGame.show();
      modalEndGame.hide();
    })
  }, 3000);
  
}

let victoryMessage=(player)=>{
  let globalBoard = document.querySelector('#globalBoard')
  let div=document.createElement('div')
  div.setAttribute('id', 'victoryMessage')
  div.classList.add('victoryCadre', 'position-absolute', 'translate-middle')
  div.innerHTML = `<p>VICTOIRE DE ${player}</p>`
  globalBoard.appendChild(div)
}
let victoryMessageAppear=()=>{
  let victoryMessage = document.querySelector('.victoryCadre')
  victoryMessage.classList.toggle('moveVC')
}