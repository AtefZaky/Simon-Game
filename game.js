let buttonColors = ["red", "blue", "green", "yellow"],
  gamePattern = [],
  userClickedPattern = [],
  started = false,
  level = 0;
////functions
// Make the next sequence in the game and add it to the game pattern
const nextSequence =()=>{
  userClickedPattern = [];
  level++
  $("#level-title").text("Level " + level);
  /// Generate a random number between 0 , 3
  let randomNumber = Math.floor(Math.random()*4),
    randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  btnAnimation(randomChosenColor);
  playSound(randomChosenColor);
}
// Make sound when we pass the name of the sound 
const playSound = (name) =>{
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
// Make the animation to the button and toggle the pressed class
const btnAnimation = (btn) =>{
  $("#"+btn).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  $("#"+btn).addClass("pressed");
  setTimeout((e) => {
    $("#"+btn).removeClass("pressed");
  }, 100);
}
// Reset the game
const startOver = () =>{
  level = 0;
  gamePattern = [];
  started = false;
}
// check the answer of the user
const checkAnswer = (currentLevel) =>{
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    //console.log("success");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  }else{
    //console.log("wrong");
    startOver();
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
  }
}
//// Events
// listen for the keyboard press to start the game
$(document).keydown(()=>{
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
// listen for the button click to get the user pattern
$(".btn").click((e)=>{
  let userChosenColor = $(e.target).attr("id");
  userClickedPattern.push(userChosenColor);
  btnAnimation(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});
