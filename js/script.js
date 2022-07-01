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

// ---------------------------------------------------------
// DECLARATION DES FONCTIONS
// ---------------------------------------------------------

let hideLogBtn =(name)=>{
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

mdMediaQuery.addEventListener('change', ()=>{
  hideLogBtn(btnLogP1)
  hideLogBtn(btnLogP2)
})
btnLogP1.addEventListener("click",()=>hideLog(logListP1))
btnLogP2.addEventListener("click",()=>hideLog(logListP2))