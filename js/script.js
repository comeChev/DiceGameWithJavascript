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
let logList = document.querySelector('#logP1')
let btnLog = document.querySelector('#btnHideLog')

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

// ---------------------------------------------------------
// EXECUTION DU CODE
// ---------------------------------------------------------

mdMediaQuery.addEventListener('change', ()=>hideLogBtn(btnLog))
btnLog.addEventListener("click",()=>hideLog(logList))