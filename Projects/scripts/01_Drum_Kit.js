// Utility Functions

var audioZ = new Audio("./Resources/01_Drum_Kit/sounds/tom-1.mp3");
var audioX = new Audio("./Resources/01_Drum_Kit/sounds/tom-2.mp3");
var audioC = new Audio("./Resources/01_Drum_Kit/sounds/tom-3.mp3");
var audioV = new Audio("./Resources/01_Drum_Kit/sounds/tom-4.mp3");
var audioB = new Audio("./Resources/01_Drum_Kit/sounds/kick-bass.mp3");
var audioN = new Audio("./Resources/01_Drum_Kit/sounds/snare.mp3");
var audioM = new Audio("./Resources/01_Drum_Kit/sounds/crash.mp3");


function perform_z(){
    audioZ.play();
    activeElement = $(".z");
    activeElement.addClass("pressed");
    setTimeout(function(){
        activeElement.removeClass("pressed");
    }, 100);
}

function perform_x(){
    audioX.play();
    activeElement = $(".x");
    activeElement.addClass("pressed");
    setTimeout(function(){
        activeElement.removeClass("pressed");
    }, 100);
}

function perform_c(){
    audioC.play();
    activeElement = $(".c");
    activeElement.addClass("pressed");
    setTimeout(function(){
        activeElement.removeClass("pressed");
    }, 100);
}

function perform_v(){
    audioV.play();
    activeElement = $(".v");
    activeElement.addClass("pressed");
    setTimeout(function(){
        activeElement.removeClass("pressed");
    }, 100);
}

function perform_b(){
    audioB.play();
    activeElement = $(".b");
    activeElement.addClass("pressed");
    setTimeout(function(){
        activeElement.removeClass("pressed");
    }, 100);
}

function perform_n(){
    audioN.play();
    activeElement = $(".n");
    activeElement.addClass("pressed");
    setTimeout(function(){
        activeElement.removeClass("pressed");
    }, 100);
}

function perform_m(){
    audioM.play();
    activeElement = $(".m");
    activeElement.addClass("pressed");
    setTimeout(function(){
        activeElement.removeClass("pressed");
    }, 100);
}

/*-------------------------------------------------------------------*/

$(".drum").on("click", function(event){
    //console.log(event);
    if($(this).hasClass("z")){
        perform_z();
    }
    if($(this).hasClass("x")){
        perform_x();
    }
    if($(this).hasClass("c")){
        perform_c();
    }
    if($(this).hasClass("v")){
        perform_v();
    }
    if($(this).hasClass("b")){
        perform_b();
    }
    if($(this).hasClass("n")){
        perform_n();
    }
    if($(this).hasClass("m")){
        perform_m();
    }
});

$("body").on("keydown", function(event){
    if(event.key == 'z'){
        perform_z();
    }
    if(event.key == 'x'){
        perform_x();
    }
    if(event.key == 'c'){
        perform_c();
    }
    if(event.key == 'v'){
        perform_v();
    }
    if(event.key == 'b'){
        perform_b();
    }
    if(event.key == 'n'){
        perform_n();
    }
    if(event.key == 'm'){
        perform_m();
    }
});

/*-------------------------------------------------------------------*/