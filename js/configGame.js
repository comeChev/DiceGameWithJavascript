// ---------------------------------------------------------
// IMPORTATIONS
// ---------------------------------------------------------

import gamePlayer from "./diceGamePlayer.js"

// ---------------------------------------------------------
// DECLARATION DES VARIABLES
// ---------------------------------------------------------

const lgMediaQuery = window.matchMedia("(min-width : 991px)")

// ---------------------------------------------------------
// DECLARATION DE CLASSE
// ---------------------------------------------------------

export default class gameSettings{
  constructor(){
    this.numberPlayers = 2
    this.diceStyle = "#94E8E3"
    this.victoryPoints = 7
    this.mobileMode = false
    this.innerModal = document.querySelector('#addPlayerRow')
    this.globalBoard = document.querySelector('#globalBoard')
    this.diceStyle = "Dot"
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
    <div class="row">
      <div class="col-6 mb-3">
        <label for="inputColorP${i}" class="form-label">Couleur du joueur ${i}</label>
        <input type="color" class="form-control" id="inputColorP${i}" value="#ffe4c4">
      </div>
      <div class="col-6 mb-3">
        <label for="inputTextColorP${i}" class="form-label">Couleur du texte</label>
        <input type="color" class="form-control" id="inputTextColorP${i}" value="#000000">
      </div>
    </div>`
    this.innerModal.appendChild(div)
    let namePlayer = document.querySelector(`#inputNameP${i}`)
    namePlayer.value = `Joueur ${i}`
    // pour sélectionner le texte au clic de l'input
    namePlayer.addEventListener('click',(e)=>{
      namePlayer.setSelectionRange(0, namePlayer.value.length)
    })
    let colorP = document.querySelector(`#inputColorP${i}`)
    // on ajouter un eventListener sur le changement de couleur de fond
    colorP.addEventListener("change",()=>{
      let form = document.querySelector(`#formP${i}`)
      form.style.backgroundColor= colorP.value
      let input = document.querySelector(`#inputNameP${i}`)
      input.style.backgroundColor= colorP.value  
    })
    let colorT = document.querySelector(`#inputTextColorP${i}`)
    // on ajouter un eventListener sur le changement de couleur de texte
    colorT.addEventListener("change",()=>{
      let input = document.querySelector(`#inputNameP${i}`)
      input.style.color= colorT.value  
    })
  }
  // pour changer le nombre de joueurs dans la modale sur changement du select
  changeNumberPlayers=(selectNumberPlayers)=>{
    selectNumberPlayers.addEventListener('change',()=>{
      this.numberPlayers = parseInt(selectNumberPlayers.value)
      let addPlayerRow = document.querySelector('#addPlayerRow')
      addPlayerRow.innerHTML=""
      for (let i=1; i<(this.numberPlayers+1); i++){
        this.setPlayerModal(i)
      }
      this.addDiceModal()
      addSelectVP()
    })
  }
  // pour ajouter tous les cadres de joueur sur le board en fonction du nombre de joueurs sélectionnés
  addCadrePlayers=()=>{
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
    let colorBtn = document.querySelector('#inputStyleDice').value
    let styleDice
    if(this.diceStyle=="Back"){
      styleDice="Back"
    } else{
      styleDice="Dot"
    }
    let btn = document.createElement('div')
    btn.classList.add('diceCadre','position-absolute', 'translate-middle')
    btn.innerHTML=`
      <div>
        <button class="btnStyle dice${styleDice}1" id="diceButton" style="background-color:${colorBtn}">
        </button>
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
      } else{
        return inputs[0].value
      }
    }
    let color = inputs[1].value
    let colorText= inputs[2].value
    changeBackgroundBoard(i,color, colorText)
    return new gamePlayer(namePlayer(),color,colorText,i)
  }
  //pour initiliser la modale
  initModal=()=>{
    this.innerModal.innerHTML="" 
    for (let i=0; i<this.numberPlayers;i++){
      this.setPlayerModal(i+1)
    }
    this.addDiceModal()
    addSelectVP()
    document.querySelector('#selectNumberPlayers').value = 2
    document.querySelector('#mobileMode').checked = false
  }
  // pour modifier les points de victoire
  changeVictoryPoints=()=>{
    let selectVP = document.querySelector('#inputSelectVP')
    if(selectVP.value != 1){
      return selectVP.value
    }else{
      return 100
    }
  }
  // pour ajouter le choix de couleur du dé dans la modale
  addDiceModal=()=>{
    let formDiceStyle = document.createElement('div')
    formDiceStyle.classList.add('col-6')
    formDiceStyle.setAttribute('id', 'styleDice')
    formDiceStyle.innerHTML =
      `<div class="mb-3 col-12">
        <label for="inputStyleDice" class="form-label">Choisissez le style du dé</label>
        <div class="col-3">
          <input type="color" class="form-control" id="inputStyleDice" value="#ff0000">
        </div>
      </div>
      <div class="mb-3">
        <label for="selectStyleDice" class="form-label">Choisissez le style du dé</label>
        <select type="color" class="form-control" id="selectStyleDice">
          <option value="Dot">Points du dé colorés</option>
          <option value="Back">Dé coloré</option>
        </select>
        <div class="diceModal diceDot6 mt-2"></div>
      </div>
      `
    addPlayerRow.appendChild(formDiceStyle)
    let diceModal = document.querySelector('.diceModal')
    diceModal.setAttribute('style','background-color:#FF0000')
    let selectDice = document.querySelector('#selectStyleDice')
    let inputDice = document.querySelector('#inputStyleDice')
    selectDice.addEventListener('change',()=>{
      if (selectDice.value == "Back"){
        diceModal.classList.remove('diceDot6')
        diceModal.classList.add('diceBack6')
        this.diceStyle="Back"
      } else{
        diceModal.classList.remove('diceBack6')
        diceModal.classList.add('diceDot6')
        this.diceStyle="Dot"
      }
    })
    inputDice.addEventListener('change',()=>{
      diceModal.setAttribute('style',`background-color:${inputDice.value}`)
    })
  }
}

// ---------------------------------------------------------
// DECLARATION DES VARIABLES LOCALES
// ---------------------------------------------------------


// pour ajouter le choix du nombre de points de victoire dans la modale
let addSelectVP=()=>{
  let div = document.createElement('div')
  div.classList.add('col-6')
  div.setAttribute('id', 'chooseVP')
  div.innerHTML =`
    <div class="mb-3 col-12">
      <label for="inputSelectVP" class="form-label">Nombre de points de victoire</label>
      <div class="mb-3 col-12">  
        <select type="color" class="form-control" id="inputSelectVP">
          <option value = "1">---Nombre de points à obtenir---</option>
          <option value = "50">50 points</option>
          <option value = "100">100 points</option>
          <option value = "150">150 points</option>
          <option value = "200">200 points</option>
          <option value = "250">Impossible</option>
          <option value = "500">Infernal</option>
          <option value = "1000">Cauchemardesque</option>
        </select>
      </div>
    </div>
    `
      addPlayerRow.appendChild(div)
}
// pour définir un nouveau cadre de joueur
let cadrePlayer=(number,globalBoard,lgMediaQuery)=>{
  let divToAppend = document.createElement('div')
  divToAppend.classList.add("col-12", "col-lg-6", "bg-player")
  divToAppend.setAttribute("id",`playerCadre${number}`)
  divToAppend.innerHTML = `
      <div class="row text-center full-height align-items-stretch">
        <div class="col-12 col-lg-12 p-0 pt-2 pt-lg-2" id="p${number}Board">
          <div class="h-75 center-all" id="p${number}">
            <div id="p${number}Name">
              <div id="p${number}Text">
                <h2 id="nameP${number}">Player ${number}</h2>
                <h3 id="scoreP${number}">47/100</h3>
              </div>
              <div class="mt-2">
                <button class="btn btn-primary" id="btnHideLogP${number}">Montrer historique</button>
              </div>
            </div>
          </div>
          <div class="h-25 center-all" id="currentScoreP${number}">
            <div class="col-6">
              <div id="p${number}Score" class="inputScore">
                <p class="m-0">Score en cours</p>
                <h4 id="tempScoreP${number}">12</h4>
              </div>
            </div>
            <div>
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
    hideLog(document.querySelector(`#logP${number}`), btnLog)
  })
  window[`btnLogP${number}`] = document.querySelector(`#btnHideLogP${number}`,)
  lgMediaQuery.addEventListener('change', ()=>{
    showLogBtn(window[`btnLogP${number}`])
  })
} 
// pour modifier l'apparence visuelle des différents cadres en fonction de la couleur choisie
let changeBackgroundBoard=(i, color, colorText)=>{
  let cadre = document.querySelector(`#p${i}Text`)
  let cadreScore = document.querySelector(`#p${i}Score`)
  let btnKeep = document.querySelector(`#keepScoreP${i}`)
  let btnLog = document.querySelector(`#btnHideLogP${i}`)
  cadre.classList.add('inputText')
  btnKeep.classList.add('btnKeep')
  btnLog.classList.add('btnHideLog')
  cadreScore.classList.add('inputScore')
  cadre.setAttribute('style', `color:${colorText}; background-color:${color}; background-image: linear-gradient(45deg, #ffffff 0%, ${color}100%`)
  cadreScore.setAttribute('style', `color:${colorText}; background-color:${color}; background-image: linear-gradient(45deg, #ffffff 0%, ${color}100%`)
  btnKeep.setAttribute('style', `color:${colorText}; background-color:${color}; background-image: linear-gradient(45deg, #ffffff 0%, ${color}100%`)
  btnLog.setAttribute('style', `color:${colorText}; background-color:${color}; background-image: linear-gradient(45deg, #ffffff 0%, ${color}100%`)
}
// pour modifier la disposition du board du player1 en mode mobile
let changeOrderDiv=(divElement)=>{
  lgMediaQuery.addEventListener("change",()=>{
    if(divElement.firstChild.id = "p1"){
      let divToMove = divElement.children[0]
      divElement.children[0].remove()
      divElement.appendChild(divToMove)
      let pName = document.querySelector(`#p1Name`)
      let divtoMoveInner = pName.children[1]
      pName.children[1].remove()
      pName.prepend(divtoMoveInner)
    } else{
      let divToMove = divElement.children[1]
      divElement.children[1].remove()
      divElement.prependChild(divToMove)
    }
    changeNumberPlayerCadre()
  })
}
// pour réorganiser les div du player 1 en fonction de la taille de l'écran
let reorganizeOrderDiv=(divElement)=>{
  if(!lgMediaQuery.matches){
    if(divElement.firstChild.id = "p1"){
      let divToMove = divElement.children[0]
      divElement.children[0].remove()
      divElement.appendChild(divToMove)
      let pName = document.querySelector(`#p1Name`)
      let divtoMoveInner = pName.children[1]
      pName.children[1].remove()
      pName.prepend(divtoMoveInner)
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
  name.classList.toggle('d-none')
}
// pour afficher le cadre de texte de l'historique
let hideLog=(name,nameBtn)=>{  
  if(!name.classList.contains('d-md-flex')){
    name.classList.add('d-md-flex')
    nameBtn.innerText = "Cacher historique"
  } else {
    name.classList.remove('d-md-flex')
    nameBtn.innerText = "Montrer historique"
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
