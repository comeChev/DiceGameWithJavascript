 class historique{
  constructor(idGame){
    this.idGame = idGame;
    this.logGame = {
   
    }
  }
 }
// pour insérer l'historique dans le textarea
let populateArea=(name)=>{name.value += "lorem ipsum blabla \n"}

// pour reset l'historique dans le textarea
let resetArea=(name)=>{name.value=""}

// pour générer un nombre aléatoire suivant le nombre de faces du dé
let randomNumber=(diceFaces)=>{
  console.log(Math.floor(Math.random() * (diceFaces - 1 + 1) + 1))
}