var colors = ["red", "blue", "green", "yellow"];

var pattern = [];

var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });


  $(".btn").click(function() {
    
    var userChosenColor = $(this).attr("id");

    
    userClickedPattern.push(userChosenColor);

    
    playSound(userChosenColor);

    
    animatePress(userChosenColor);

   
    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {

    if (pattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === pattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
      } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
  
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        startOver();
      }
  }
  

  function nextSequence() {
    userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = colors[randomNumber];
  pattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}


function animatePress(color) {
    $("#" + color).addClass("pressed");
    setTimeout(function() {
        $("#" + color).removeClass("pressed");
    }, 100);
}


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }



function startOver() {
    level = 0;
    pattern = [];
    started = false;
  }





