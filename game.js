let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let count = 0;
let userClickedPattern = [];
let level = 0;
let gameEnd = false;
let wrong = new Audio("sounds/wrong.mp3");
$(".btn").on("click", function () {
    //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
    let userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer();

});

function nextSequence() {
    level++;

    $("h1").text("Level: " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    // checkAnswer(level);


}

function playSound(name) {

    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColour) {
    let collur = $("." + currentColour);
    collur.addClass("pressed");
    setTimeout(function () {
        collur.removeClass("pressed");
    }, 100);

}
$(document).on("keypress", function (event) {
    nextSequence();

});

function startOver() {
    let gameOver = $("body");
    gameOver.addClass("game-over");
    setTimeout(function () {
        $("h1").text("Press A key to Start");
        gameOver.removeClass("game-over");
    }, 200);

    wrong.play();


    $("h1").text("Game Over");
    level = 0;

    gamePattern.length = 0;
    userClickedPattern.length = 0;

}

function checkAnswer() {


    if (gamePattern.length === userClickedPattern.length) {
        let isLost = false;
        for (let i = 0; i < gamePattern.length; i++) {
            if(gamePattern[i] !== userClickedPattern[i]){
                isLost = true;
            }
        }
        if(isLost){
            startOver();
        }else{
            setTimeout(function () {
                nextSequence()
            }, 1000);
            userClickedPattern.length = 0;
        }
    }
}
