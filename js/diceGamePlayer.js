import dataPlayer from "./dataGame.js";

// ---------------------------------------------------------
// DECLARATION DE CLASSE
// ---------------------------------------------------------

export default class gamePlayer{
  constructor(namePlayer, colorPlayer,colorTextPlayer,idPlayer){
    this.namePlayer = namePlayer;
    this.colorPlayer = colorPlayer;
    this.colorTextPlayer = colorTextPlayer
    this.logGame = [];
    this.idPlayer = idPlayer;
    this.score = 0
    this.tempScore = 0
    this.turn = true
    this.numberTurn = 0
    this.dataPlayer = new dataPlayer()
  }

  getNamePlayer = ()=>{return this.namePlayer}
  getColorPlayer =()=>{return this.colorPlayer}
  getScore = ()=>{return this.score}
  getTempScore = ()=>{return this.tempScore}
  arrayToString=()=>{
    let arrayString = this.logGame.join(`\r\n`)
    return arrayString.toString()
  }
  setTurn = (value,i)=>{
    this.turn = value
    if(this.turn){
      addFocus(i)
    }else{removeFocus(i)}
  }
  resetScore = ()=>{
    this.tempScore=0
    this.score=0
    this.numberTurn=0
  }
   
  showValue=(i,vp)=>{
    document.querySelector(`#scoreP${i+1}`).innerHTML = `${this.score}/${vp}`
    document.querySelector(`#tempScoreP${i+1}`).innerHTML = this.tempScore
    document.querySelector(`#logAreaP${i+1}`).value = this.arrayToString()
    document.querySelector(`#logAreaP${i+1}`).scrollTop =  document.querySelector(`#logAreaP${i+1}`).scrollHeight
  }
  transformMobile=()=>{
    document.querySelector(`#scoreP1`).classList.add('mobileMode')
    document.querySelector(`#p1Score`).classList.add('mobileMode')
    document.querySelector(`#nameP1`).classList.add('mobileMode')
    document.querySelector(`#keepScoreP1`).classList.add('mobileMode')
    // document.querySelector(`#logAreaP1`).classList.add('mobileMode') //Pas utile en mode mobile car pas possible d'afficher le log
  }
  transformMobileNot=()=>{
   
    // document.querySelector(`#logAreaP1`).classList.add('mobileMode') //Pas utile en mode mobile car pas possible d'afficher le log
  }

}

// ---------------------------------------------------------
// DECLARATION DES VARIABLES LOCALES
// ---------------------------------------------------------


let addFocus=(i)=>{
  let cadre = document.querySelector(`playerCadre${i}`)
  cadre.classlist.add('border-player')
}
let removeFocus=(i)=>{
  let cadre = document.querySelector(`playerCadre${i}`)
  cadre.classlist.remove('border-player')
}