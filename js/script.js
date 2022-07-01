/* MEDIA QUERY BOOTSTRAP 
small 576px
medium 768pc
large 992px */

// ---------------------------------------------------------
// DECLARATION DES VARIABLES MEDIAQUERIES
// ---------------------------------------------------------
let smMediaQuery = window.matchMedia("(min-width: 576px)")
let mdMediaQuery = window.matchMedia("(min-width: 768px)")
let lgMediaQuery = window.matchMedia("(min-width: 992px)")

// ---------------------------------------------------------
// DECLARATION DES VARIABLES
// ---------------------------------------------------------
const logListP1 = document.querySelector('#logP1')
const logListP2 = document.querySelector('#logP2')
const btnLogP1 = document.querySelector('#btnHideLogP1')
const btnLogP2 = document.querySelector('#btnHideLogP2')
const logAreaP1 = document.querySelector("#logAreaP1")
const logAreaP2 = document.querySelector("#logAreaP2")
const p1Board = document.querySelector('#p1Board')

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
  }}
let hideLog=(name)=>{  
  if(!name.classList.contains('d-md-flex')){
    name.classList.add('d-md-flex')
  } else {
    name.classList.remove('d-md-flex')
  }}
let populateArea=(name)=>{name.value += "lorem ipsum blabla \n"}
let resetArea=(name)=>{name.value=""}

// ---------------------------------------------------------
// EXECUTION DU CODE
// ---------------------------------------------------------

window.onload =()=>loadPage()
lgMediaQuery.addEventListener('change', ()=>{
  showLogBtn(btnLogP1)
  showLogBtn(btnLogP2)
  changeOrderDiv(p1Board)
})
btnLogP1.addEventListener("click",()=>hideLog(logListP1))
btnLogP2.addEventListener("click",()=>hideLog(logListP2))