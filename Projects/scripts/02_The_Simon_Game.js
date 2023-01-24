var greenAudio = new Audio("./Resources/02_The_Simon_Game/sounds/green.mp3");
var redAudio = new Audio("./Resources/02_The_Simon_Game/sounds/red.mp3");
var yellowAudio = new Audio("./Resources/02_The_Simon_Game/sounds/yellow.mp3");
var blueAudio = new Audio("./Resources/02_The_Simon_Game/sounds/blue.mp3");
var wrongAudio = new Audio("./Resources/02_The_Simon_Game/sounds/wrong.mp3");

var randomNumber = 0;
var randomChosenColor = ["green", "red", "yellow", "blue"];

function playGreen(){
    $("#green").fadeOut(150).fadeIn(150);
    greenAudio.play();
}

function playRed(){
    $("#red").fadeOut(150).fadeIn(150);
    redAudio.play();
}

function playYellow(){
    $("#yellow").fadeOut(150).fadeIn(150);
    yellowAudio.play();
}

function playBlue(){
    $("#blue").fadeOut(150).fadeIn(150);
    blueAudio.play();
}

function playGameOver(id){
    $("#" + randomChosenColor[id]).fadeOut(150).fadeIn(150);
    wrongAudio.play();
}

function nextSequence(){
    randomNumber = Math.floor(Math.random() * 4);
    console.log(randomNumber);
}

$("#green").on("click", function(){
    playGreen();
});

$("#red").on("click", function(){
    playRed();
});

$("#yellow").on("click", function(){
    playYellow();
});

$("#blue").on("click", function(){
    playBlue();
});