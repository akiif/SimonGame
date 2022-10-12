var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;


$(document).keydown(function () {
    if (level === 0) {
        nextSequence();
    }
});


// Event listener for click:
$(".btn").click(function () {

    var userChosenColor = $(this).attr("id"); // event.target.id; OR  $(this).attr("id")

    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    if (level != 0) { // If the game has'nt started and the user presses any button then ignore it.
        // call checkAnswer() after a user has clicked and chosen their answer, passing in the answer that has been clicked
        checkAnswer(userClickedPattern.length - 1);
    }

})


function checkAnswer(currentPressedColor) {

    // if the current clicked answer is same as the answer that should have been clicked
    if (gamePattern[currentPressedColor] === userClickedPattern[currentPressedColor]) {

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    } else {

        $("#level-title").text("Game Over, Press any Key to Restart");
        playSound("wrong");
        $("body").addClass("game-over");


        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 300);

        startOver();
    }
}


function nextSequence() {

    // when next sequence is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

    level++;
    $("#level-title").text("Level " + level);
}


// function to create an audio class and play the corresponding sound
function playSound(chosenColor) {
    var url = "sounds/" + chosenColor + ".mp3";
    var audio = new Audio(url);
    audio.play();
}

// function to animate the button when it is pressed
function animatePress(currentColor) {
    var activeButton = $("#" + currentColor);
    activeButton.addClass("pressed");

    setTimeout(function () {
        activeButton.removeClass("pressed");
    }, 100);
}


function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}