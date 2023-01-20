document.querySelector(".btn1").addEventListener("click", function(){
    document.getElementById("heading").innerHTML = "DOM BASICS - JAVASCRIPT";
});

var colorRange = ["#9400D3", "#4B0082", "#0000FF", "#00FF00", "#FFFF00", "#FF7F00", "#FF0000"], count=0;
var visibility = 0;
var data="";

document.querySelector(".btn2").addEventListener("click", function(){
    count++;
    if(count>7)
        count=0;
    document.querySelector("#changeColor").style.color = colorRange[count];

});

document.querySelector(".btn3").addEventListener("click", function(){
    alert("Button 3 says - Hi!")
});

document.querySelector(".btn4").addEventListener("click", function(){
    var username = prompt("Username: ");
    document.getElementById("printUsername").innerHTML = "Hello, " + username + ".";
});

document.querySelector(".btn5").addEventListener("click", function(){
    if(visibility==0){
        document.getElementById("visibleObject").classList.add("invisible");
        visibility = 1;
    }
    else {
        document.getElementById("visibleObject").classList.remove("invisible");
        visibility = 0;
    }
});

var dice = ["dice1.png", "dice2.png", "dice3.png", "dice4.png", "dice5.png", "dice6.png"], player1, player2;

document.getElementById("refresh-btn").addEventListener("click", function(){
    player1 = Math.floor(Math.random() * dice.length);
    player2 = Math.floor(Math.random() * dice.length);

    document.querySelector(".img1").setAttribute("src", "./Resources/" + dice[player1]);
    document.querySelector(".img2").setAttribute("src", "./Resources/" + dice[player2]);

    if(player1 > player2){
        document.querySelector("#result").innerHTML = "Player 1 Wins 🎉";
    }
    else if (player1 < player2){
        document.querySelector("#result").innerHTML = "Player 2 Wins 🎉";
    }
    else {
        document.querySelector("#result").innerHTML = "Draw ☕";
    }
});

document.querySelector("body").addEventListener("keydown", function(event){
  console.log(event);
  if(event.key == "Shift" || event.key == "Control" || event.key == "Backspace")
    data=data;
  else
    data = data + event.key;
  document.querySelector(".text-content").innerHTML = data;
});
