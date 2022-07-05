// ---------------------------------------------------------
// IMPORTATIONS
// ---------------------------------------------------------

import gamePlayer from "./diceGamePlayer.js"

// ---------------------------------------------------------
// DECLARATION DE CLASSE
// ---------------------------------------------------------

export default class gameSettings{
  constructor(){
    this.numberPlayers = 2
    this.diceStyle = "#94E8E3"
    this.numberClickedDice = 0
    this.victoryPoints = 7
    this.innerModal = document.querySelector('#addPlayerRow')
    this.globalBoard = document.querySelector('#globalBoard')
  }
 
  // pour changer la couleur de fond de chaque joueur dans la modale
  changeColorBackgroundForm=(nb)=>{
    for (let i=1; i<nb+1; i++){
      let color = document.querySelector(`#inputColorP${i}`)
      color.addEventListener("change",()=>{
        let form = document.querySelector(`#formP${i}`)
        form.style.backgroundColor=`${color.value}`
      })
    }
  }
  // pour insérer un joueur dans la modale
  setPlayerModal =(i)=>{
    let div = document.createElement('div')
    div.classList.add('col-12', 'col-md-6')
    div.setAttribute("id",`formP${i}`)
    div.innerHTML = `
    <div class="mb-3">
    <label for="inputNameP${i}" class="form-label">Nom du joueur ${i}</label>
    <input type="text" class="form-control" id="inputNameP${i}" placeholder="Joueur ${i}">
    </div>
    <div class="mb-3">
    <label for="inputColorP${i}" class="form-label">Couleur du joueur ${i}</label>
    <input type="color" class="form-control" id="inputColorP${i}" value="#ffe4c4">
    </div>`
    this.innerModal.appendChild(div)
    let color = document.querySelector(`#inputColorP${i}`)
    color.addEventListener("change",()=>{
      let form = document.querySelector(`#formP${i}`)
      form.style.backgroundColor=`${color.value}`
    })
  }
  // pour changer le nombre de joueurs dans la modale
  changeNumberPlayers=(selectNumberPlayers)=>{
    selectNumberPlayers.addEventListener('change',()=>{
      this.numberPlayers = parseInt(selectNumberPlayers.value)
      let addPlayerRow = document.querySelector('#addPlayerRow')
      addPlayerRow.innerHTML=""
      for (let i=1; i<(this.numberPlayers+1); i++){
        let divPlayer = document.createElement('div')
        divPlayer.classList.add('col-12', 'col-md-6')
        divPlayer.setAttribute("id",`formP${i}`)
        divPlayer.innerHTML = `
        <div class="mb-3">
        <label for="inputNameP${i}" class="form-label">Nom du joueur ${i}</label>
        <input type="text" class="form-control" id="inputNameP${i}" placeholder="Joueur ${i}">
        </div>
        <div class="mb-3">
        <label for="inputColorP${i}" class="form-label">Couleur du joueur ${i}</label>
        <input type="color" class="form-control" id="inputColorP${i}" value="#ffe4c4">
        </div>`
        addPlayerRow.appendChild(divPlayer)
        let color = document.querySelector(`#inputColorP${i}`)
        color.addEventListener("change",()=>{
          let form = document.querySelector(`#formP${i}`)
          form.style.backgroundColor=`${color.value}`
        })
      }
      let formDiceStyle = document.createElement('div')
      formDiceStyle.classList.add('col-12')
      formDiceStyle.setAttribute('id', 'styleDice')
      formDiceStyle.innerHTML =
      `<div class="mb-3">
      <label for="inputStyleDice" class="form-label">Choisissez le style du dé</label>
      <input type="color" class="form-control" id="inputStyleDice" value="#94E8E3">
      </div>`
      addPlayerRow.appendChild(formDiceStyle)
    })
  }
  // pour ajouter tous les cadres de joueur en fonction du nombre de joueurs sélectionnés
  addCadrePlayers=()=>{
    let lgMediaQuery = window.matchMedia("(min-width : 991px)")
    this.globalBoard.innerHTML = ""
    for(let i=1; i<(this.numberPlayers+1);i++){
      cadrePlayer(i,this.globalBoard,lgMediaQuery)
      if (!lgMediaQuery.matches) {
        showLogBtn(window[`btnLogP${i}`])
      }  
    }
    this.diceButtonAdd()
    changeOrderDiv(document.querySelector("#p1Board"))
    reorganizeOrderDiv(document.querySelector("#p1Board"))
  }
  // pour ajouter le dé sur le board
  diceButtonAdd = ()=>{
      let btn = document.createElement('div')
      btn.classList.add('diceCadre','position-absolute', 'translate-middle')
      btn.innerHTML=`
        <div>
          <button class="btn" id="diceButton" style="background-color:aqua; height:80px; width:80px"></button>
        </div>
        <div>
          <button class ='btn btn-success m-2'id="btnDiceRoll">Roll dice</button>
        </div>
      `
      this.globalBoard.append(btn)
  }
  // pour créer un nouveau joueur
  createPlayer=(i)=>{   
    let form= this.innerModal
    let inputs = form.children[i-1].querySelectorAll('.form-control')
    let namePlayer = ()=>{
      if (inputs[0].value == "" || inputs[0].value == null){
        return `Joueur ${i}`
      } else{return inputs[0].value}
    }
    let color = inputs[1].value
    changeBackgroundBoard(i,color)
    return new gamePlayer(namePlayer(),color,i)
  }
  //pour initiliser la modale à la fin
  initModal=()=>{
    this.innerModal.innerHTML=""
    for (let i=0; i<this.numberPlayers;i++){
      this.setPlayerModal(i+1)
    }
    addColorDiceSelector(this.innerModal)
  }
}

// ---------------------------------------------------------
// DECLARATION DES VARIABLES LOCALES
// ---------------------------------------------------------

// pour définir un nouveau cadre de joueur
let cadrePlayer=(number,globalBoard,lgMediaQuery)=>{
    let divToAppend = document.createElement('div')
    divToAppend.classList.add("col-12", "col-lg-6", "bg-player")
    divToAppend.setAttribute("id",`playerCadre${number}`)
    divToAppend.innerHTML = `
      <div class="row text-center full-height align-items-stretch">
        <div class="col-12 col-lg-12 p-0 pt-2 pt-lg-2" id="p${number}Board">
          <div class="h-75 center-all" id="p${number}">
            <div>
              <h2 id="nameP${number}">Player ${number}</h2>
              <h3 id="scoreP${number}">47/100</h3>
              <button class="btn btn-primary" id="btnHideLogP${number}">Cacher log</button>
            </div>
          </div>
          <div class="h-25 center-all p-4" id="currentScoreP${number}">
            <div class="col-8">
              <p class="m-0">Score en cours</p>
              <h4 id="tempScoreP${number}">12</h4>
            </div>
            <div class="col-4">
              <button class="btn btn-success d-none" id="keepScoreP${number}">Garder le score</button>
            </div>
          </div>
        </div>
        <div class="d-none col-lg-12 center-all p-1" id="logP${number}">
          <div class="form-group row container-fluid p-0 m-0 h-100 align-content-start">
            <label class='input-label' style="height:20%" for="logAreaP${number}">Historique de la partie</label>
            <textarea title ="Historique" class="pt-2 form-control" style="height:80%" disabled id="logAreaP${number}"></textarea>
          </div>
        </div>
      </div>`
    globalBoard.append(divToAppend)
    let btnLog = document.querySelector(`#btnHideLogP${number}`)
    btnLog.addEventListener("click",()=> {
      hideLog(document.querySelector(`#logP${number}`))
    })
    window[`btnLogP${number}`] = document.querySelector(`#btnHideLogP${number}`)
    lgMediaQuery.addEventListener('change', ()=>{showLogBtn(window[`btnLogP${number}`])})
} 
// pour modifier le fond du board
let changeBackgroundBoard=(i, color)=>{
  let cadre = document.querySelector(`#playerCadre${i}`)
  cadre.setAttribute('style', `background-color:${color}`)
}
// pour modifier la disposition du board du player1 en mode mobile
let changeOrderDiv=(divElement)=>{
  window.matchMedia("(min-width : 991px)").addEventListener("change",()=>{
    if(divElement.firstChild.id = "p1"){
      let divToMove = divElement.children[0]
      divElement.children[0].remove()
      divElement.appendChild(divToMove)
    } else{
      console.log('test')
      let divToMove = divElement.children[1]
      divElement.children[1].remove()
      divElement.prependChild(divToMove)
    }
    changeNumberPlayerCadre()
  })
}
// pour réorganiser les div du player 1 en fonction de la taille de l'écran
let reorganizeOrderDiv=(divElement)=>{
  if(!window.matchMedia("(min-width : 991px)").matches){
    if(divElement.firstChild.id = "p1"){
      console.log('test')
      let divToMove = divElement.children[0]
      divElement.children[0].remove()
      divElement.appendChild(divToMove)
    } else{
      let divToMove = divElement.children[1]
      divElement.children[1].remove()
      divElement.prependChild(divToMove)
    }
    changeNumberPlayerCadre()
  }
}
// pour cacher les boutons d'historique
let showLogBtn =(name)=>{
  if(!name.classList.contains('d-none')){
    name.classList.add('d-none')
  } else {
    name.classList.remove('d-none')
  }
}
// pour afficher le cadre de texte de l'historique
let hideLog=(name)=>{  
  if(!name.classList.contains('d-md-flex')){
    name.classList.add('d-md-flex')
  } else {
    name.classList.remove('d-md-flex')
  }
}
// pour changer le nombres de cadres à afficher en cas de passage à écran mobile
let changeNumberPlayerCadre=()=>{
  let numberCadre = globalBoard.querySelectorAll('.bg-player').length
  if (!window.matchMedia("(min-width : 991px)").matches){
    if(numberCadre>2){
      //on doit garder les 2 premières div (soit [0] et [1])
      //si on a 3 cadres on doit enlever le [2]
      //si on a 4 cadres on doit enlever le [2] et [3]
      for(let i=3;i<numberCadre+1;i++){
        let divToRemove=document.querySelector(`#playerCadre${i}`)
        divToRemove.remove()
      }
    }
  }
}
// pour ajouter le select de couleur du bouton
let addColorDiceSelector=(modal)=>{
  let div = document.createElement('div')
  div.setAttribute('id', 'styleDice')
  div.classList.add('col-12')
  div.innerHTML =`
    <div class="mb-3">
      <label for="inputStyleDice" class="form-label">Choisissez le style du dé</label>
      <input type="color" class="form-control" id="inputStyleDice" value="#94E8E3">
    </div>`
    modal.appendChild(div)
}