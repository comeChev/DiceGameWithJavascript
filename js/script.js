
/* MEDIA QUERY BOOTSTRAP 
small 576px
medium 768pc
large 992px */

// ---------------------------------------------------------
// DECLARATION DES VARIABLES MEDIAQUERIES
// ---------------------------------------------------------
const smMediaQuery = window.matchMedia("(min-width: 576px)")
const mdMediaQuery = window.matchMedia("(min-width: 768px)")
const lgMediaQuery = window.matchMedia("(min-width: 992px)")
const underLgMediaQuery = window.matchMedia("(max-width : 991px)")

// ---------------------------------------------------------
// DECLARATION DES VARIABLES
// ---------------------------------------------------------
const globalBoard = document.querySelector('#globalBoard')
const logListP1 = document.querySelector('#logP1')
const logListP2 = document.querySelector('#logP2')
const btnLogP1 = document.querySelector('#btnHideLogP1')
const btnLogP2 = document.querySelector('#btnHideLogP2')
const logAreaP1 = document.querySelector("#logAreaP1")
const logAreaP2 = document.querySelector("#logAreaP2")
const p1Board = document.querySelector('#p1Board')
const diceButton = document.querySelector('#diceButton')
const btnCloseGame = document.querySelector('#btnCloseGame')
const modalNewGame = new bootstrap.Modal(document.querySelector("#modalNewGame"));
const btnNewGame = document.querySelector('#btnNewGame')
const selectNumberPlayers = document.querySelector('#selectNumberPlayers')
// ---------------------------------------------------------
// DECLARATION DES FONCTIONS
// ---------------------------------------------------------

let changeOrderDiv=(divElement)=>{
  if(divElement.firstChild.id != "p1"){
    let divToMove = divElement.children[0]
    divElement.children[0].remove()
    divElement.appendChild(divToMove)
  }
}
let loadPage =()=>{
  if (!lgMediaQuery.matches){
    changeOrderDiv(p1Board)
    showLogBtn(btnLogP1)
    showLogBtn(btnLogP2)
  }
}
let showLogBtn =(name)=>{
  if(!name.classList.contains('d-none')){
    name.classList.add('d-none')
  } else {
    name.classList.remove('d-none')
  }
}
let hideLog=(name)=>{  
  if(!name.classList.contains('d-md-flex')){
    name.classList.add('d-md-flex')
  } else {
    name.classList.remove('d-md-flex')
  }
}
let populateArea=(name)=>{name.value += "lorem ipsum blabla \n"}
let resetArea=(name)=>{name.value=""}
let randomNumber=(diceFaces)=>{
  console.log(Math.floor(Math.random() * (diceFaces - 1 + 1) + 1))
}
let changeColorBackgroundForm=()=>{
  let numberPlayers = parseInt(selectNumberPlayers.value)+1
  for (let i=1; i<numberPlayers; i++){
    let color = document.querySelector(`#inputColorP${i}`)
    color.addEventListener("change",()=>{
      let form = document.querySelector(`#formP${i}`)
      form.style.backgroundColor=`${color.value}`
    })
  }
}
let changeNumberPlayers=()=>{
  selectNumberPlayers.addEventListener('change',()=>{
    let numberPlayers = parseInt(selectNumberPlayers.value)+1
    let addPlayerRow = document.querySelector('#addPlayerRow')
    addPlayerRow.innerHTML=""
    for (let i=1; i<numberPlayers; i++){
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
  })
}
let changeNumberPlayerCadre=()=>{
  let numberCadre = globalBoard.querySelectorAll('.bg-player').length
  console.log(numberCadre)
  if (!lgMediaQuery.matches){
    if(numberCadre>2){
      for(let i=((numberCadre-2)+1);i<numberCadre;i++){
        globalBoard.children[i].remove()
      }
    }
  }
}

// ---------------------------------------------------------
// EXECUTION DU CODE
// ---------------------------------------------------------

window.onload =()=>loadPage()
lgMediaQuery.addEventListener('change', ()=>{
  showLogBtn(btnLogP1)
  showLogBtn(btnLogP2)
  changeOrderDiv(p1Board)
})
btnLogP1.addEventListener("click",()=> hideLog(logListP1))
btnLogP2.addEventListener("click",()=> hideLog(logListP2))
diceButton.addEventListener('click',()=> randomNumber(6))
btnNewGame.addEventListener('click',()=> modalNewGame.show())
btnCloseGame.addEventListener('click',()=> modalNewGame.hide())
changeNumberPlayers()
changeNumberPlayerCadre()
underLgMediaQuery.addEventListener('change', ()=>changeNumberPlayerCadre())