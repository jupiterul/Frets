let fretboard =  document.getElementById("fretboard")

console.log(fretboard);
let note = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
let string = ["E", "B", "G", "D", "A", "E"]

/*
for(let i=0;i<6;i++){
    let openstringposition = note.indexOf(string[i]);
    console.log(openstringposition)
}*/

let fretboardmatrix = [];

for(let i=0;i<6;i++){
    let openstringposition = note.indexOf(string[i]);
     fretboardmatrix[i] = []
    for(let j=0;j<=24;j++)
        fretboardmatrix[i].push(note[(openstringposition+j)% 12]);
}

/*
let fretboardmatrixhtml = "<table border=1>";
for(let i=0;i<6;i++){
    fretboardmatrixhtml += "<tr>";
    for(let j=0;j<=24;j++)
     fretboardmatrixhtml += "<td data-string='" + i + "' data-fret='" + j + "'>" + fretboardmatrix[i][j] + "</td>";
fretboardmatrixhtml +="</tr>";
}
fretboardmatrixhtml += "</table>";
*/

let fretboardmatrixhtml = "";
for(let i=0;i<6;i++){
    for(let j=0;j<=24;j++)
        if(j==0)
            fretboardmatrixhtml += "<div data-string='" + i + "' data-fret='" + j + "'data-openstring='" + string[i] + "'>" + "</div>";
        else
             fretboardmatrixhtml += "<div data-string='" + i + "' data-fret='" + j + "'>" + "</div>";
}

fretboard.innerHTML = fretboardmatrixhtml;

let selectednote =  document.getElementById("selectednote")
let clickednote;

fretboard.addEventListener("click",function(event){
    if (gamestarted==false)
        return;

    let clickedstring=event.target.dataset.string;
    let clickedfret=event.target.dataset.fret;

    clickednote = fretboardmatrix[clickedstring][clickedfret];
    if(clickedfret!=0){
    event.target.textContent = clickednote;
    event.target.classList.add("selected");}

    if (checkanswer(clickednote))
        answer.innerHTML = "Right";
        else
        answer.innerHTML = "Wrong";
    
   selectednote.innerHTML = fretboardmatrix[clickedstring][clickedfret] + " string " + string[clickedstring] + " fret " + clickedfret;
});
/*
let startbutton = document.getElementById("startbutton")
startbutton.addEventListener("click",function(event){
    console.log("start was pressed");
})
*/

let randomnotedisplay = document.getElementById("randomnotedisplay")
let startbutton = document.getElementById("startbutton")
let randomnote;

startbutton.addEventListener("click",function(event){
    gamestarted=true;
    randomnote = Math.floor(Math.random()*note.length)
    randomnotedisplay.innerHTML = note[randomnote];
})

let answer = document.getElementById("answer")
/*
    function checkanswer (clickednote){
        if (note[randomnote] == clickednote)
            answer.innerHTML = "Right";
         else
            answer.innerHTML = "Wrong";
    }
*/

    function checkanswer (clickednote){
    return(note[randomnote]==clickednote);
}

let gamestarted = false;

let dottedfrets = [3, 5, 7, 9, 12, 15, 17, 19, 21]

fretboard.insertAdjacentHTML("beforeend",'<div id="dots"></div>')
let dots = document.getElementById("dots");


for(let i=0;i<dottedfrets.length;i++){
    let dot = document.createElement("div");
    dots.appendChild(dot);
    dot.dataset.dottedfrets=dottedfrets[i];
    dot.style.gridColumn=dottedfrets[i]+1;
}

