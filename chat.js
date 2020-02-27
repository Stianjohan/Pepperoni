const inpNavn = document.querySelector("#inpNavn");
const inpMeld = document.querySelector("#inpMeld");
const divMeld = document.querySelector("#meldinger");

let db = firebase.firestore();
let chat = db.collection("chat");

function LeggTilMeld(){
  chat.add({
    fra: inpNavn.value,
    tekst: inpMeld.value
  })
}

function lagHtml(element){
  divMeld.innerHTML += `
  <section class="chat">
  <div id="du"> ${element["fra"]}:</div>
  <div id="hei"> ${element["tekst"]}</div>
  </section>
  `
}
function skrivResultat(snapshot){
  snapshot.docChanges().forEach((element) => lagHtml(element.doc.data()));
  //snapshot.forEach(element => console.log(element.data()));

}
chat.onSnapshot(snapshot => skrivResultat(snapshot));

function slettHistorikk(snapshot){
  divMeld.innerHTML = "";
}
