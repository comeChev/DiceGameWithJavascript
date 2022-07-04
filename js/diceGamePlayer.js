// ---------------------------------------------------------
// DECLARATION DE CLASSE
// ---------------------------------------------------------

export default class gamePlayer{
  constructor(namePlayer, colorPlayer,idPlayer){
    this.namePlayer = namePlayer;
    this.colorPlayer = colorPlayer;
    this.logGame = [];
    this.idPlayer = idPlayer;
    this.score = 0
    this.tempScore = 0
    this.turn = true
    this.numberTurn = 0
  }

  getNamePlayer = ()=>{return this.namePlayer}
  getColorPlayer =()=>{return this.colorPlayer}
  getScore = ()=>{return this.score}
  getTempScore = ()=>{return this.tempScore}
  arrayToString=()=>{
    let arrayString = this.logGame.join(`\r\n`)
    console.log(arrayString)
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

}






let randomDice=(dice)=>{
  return Math.floor(Math.random() * dice) + 1
}

let blabla=(i)=>{
   // on vérifie le résultat
   if (result!=1){
    console.log(`le joueur player${i} a fait un lancé de ${result}`)
    // on ajoute le résultat dans la variable temporaire
    this.tempScore += result
    console.log(`le joueur player${i} a un score temporaire ${this.tempScore}`) 
  } else{
    console.log(`le joueur player${i} a fait un lancé de ${result}`)
    // on ajoute le résultat dans la variable temporaire
    this.tempScore += 0
    // on finit le tour du joueur
    this.turn=false
    }
 let keepButton = document.querySelector(`#keepScoreP${i}`)
 keepButton.addEventListener('click',()=>{
   let resultKeep = true
   if (resultKeep){
     this.score = this.tempScore
     this.tempScore = 0
     console.log(`le joueur player${i} a un score total de ${this.score} `)
     // on finit le tour du joueur
     this.turn=false
   }
 })}



 let addFocus=(i)=>{
  let cadre = document.querySelector(`playerCadre${i}`)
  cadre.classlist.add('border-player')
 }
 let removeFocus=(i)=>{
  let cadre = document.querySelector(`playerCadre${i}`)
  cadre.classlist.remove('border-player')
 }