let fretboard =  document.getElementById("fretboard")

console.log(fretboard);
let note = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
let string = ["E", "B", "G", "D", "A", "E"]
let highscore=Number(localStorage.getItem("fretshighscore")) || 0;

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

let usednotepositions = [];
function clickednoteonfretboard(event){
    if (gamestarted==false)
        return;

    let clickedstring=event.target.dataset.string;
    let clickedfret=event.target.dataset.fret;

    if(usednotepositions.indexOf(clickedstring + ":" + clickedfret)==-1)
        usednotepositions.push(clickedstring + ":" + clickedfret);
    else
         return;

    clickednote = fretboardmatrix[clickedstring][clickedfret];
    
    if(clickedfret!=0){
    event.target.textContent = clickednote;
    event.target.classList.add("selected");}

     if(!checkanswer(clickednote)){
        event.target.classList.add("wrong");
     }

    if (checkanswer(clickednote)){
        selectednote.innerHTML = fretboardmatrix[clickedstring][clickedfret] + " String " + string[clickedstring] + "<br>Fret " + clickedfret;
        showmessage("RIGHT")
        setTimeout(function(){answer.innerHTML="";}, dissapeardelay);
        setTimeout(function(){selectednote.innerHTML="";}, dissapeardelay);
        score++;
        scoredisplay.innerHTML="Current score: " + score + "<br><span style='color:white'>Keep going!</span>";
        randomnotegenerating(event);
    }
        else{
        selectednote.innerHTML = fretboardmatrix[clickedstring][clickedfret] + " string " + string[clickedstring] + " fret " + clickedfret;
        showmessage("WRONG")
        setTimeout(function(){answer.innerHTML="";}, dissapeardelay);
        if(score>highscore){
        highscore=score;
        localStorage.setItem("fretshighscore", highscore);
        }
        highscoredisplay.innerHTML='Your best score was: <span style="color: white">' + highscore + '</span>';
        score=0;
        usednotepositions=[];
        setTimeout(function(){
        resetfretboard();
        randomnotedisplay.style.display="none";
        selectednote.innerHTML="";
        startbutton.disabled=false;
        },dissapeardelay);
        scoredisplay.innerHTML="Current score: " + score + "<br><span style='color:white'>Get better :P</span>";
        gamestarted=false;
        return;
}}

let dissapeardelay = 1500;

function showmessage(message){
    answer.innerHTML=message;
}
fretboard.addEventListener("click",clickednoteonfretboard);

let scoredisplay = document.getElementById("score")
let score = 0;
let highscoredisplay = document.getElementById("highscore")
highscoredisplay.innerHTML='Your best score was: <span style="color: white">' + highscore + '</span>';


function resetfretboard(event){
    let allnotes=fretboard.querySelectorAll("div[data-fret]");
    for(let note of allnotes){
        note.textContent="";
        note.classList.remove("selected");
        note.classList.remove("wrong");}
}

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
    startbutton.disabled=true;
    gamestarted=true;
    resetfretboard();
    usednotepositions = [];
    randomnote = Math.floor(Math.random()*note.length)
    randomnotedisplay.innerHTML = note[randomnote];
    randomnotedisplay.style.display="block";
})

function randomnotegenerating(event){
    randomnote = Math.floor(Math.random()*note.length)
    randomnotedisplay.innerHTML = note[randomnote];
}

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
    if(dottedfrets[i]!=12){
    let dot = document.createElement("div");
    dots.appendChild(dot);
    dot.dataset.dottedfrets=dottedfrets[i];
    dot.style.gridColumn=dottedfrets[i]+1;}
    else{
        let dot1 = document.createElement("div");
        dots.appendChild(dot1);
        dot1.classList.add("dot1");
        dot1.dataset.dottedfrets=dottedfrets[i];
        dot1.style.gridColumn=dottedfrets[i]+1;
    }
}


