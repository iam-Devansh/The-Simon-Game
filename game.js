var gamePattern = [];

var buttonColours = ["red","blue","green","yellow"];

var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      },1000);
    }
  }
  else {

    playSound("wrong");

    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key To Restart");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    startOver();

  }

}




function nextSequence(){
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.random()*4;
  randomNumber = Math.floor(randomNumber);


var randomChosenColour = buttonColours[randomNumber];

gamePattern.push(randomChosenColour);


// Flash Animation
$("#"+randomChosenColour).fadeOut().fadeIn();

playSound(randomChosenColour);

}

// Playing Sound

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("."+currentColour).addClass("pressed");
  setTimeout(function () {
    $("."+currentColour).removeClass("pressed");
  }, 100);
}
