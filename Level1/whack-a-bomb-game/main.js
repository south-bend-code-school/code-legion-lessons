//Global Variables
var score = 0;
var lives = 3;
var delayMilliseconds = 2000; //2 seconds
var moleClicked = false;

function displayScore() {
  $('#scoreBoard').text("Score:" + score + " Lives:"+lives);
}

function selectMole() {
  //Pick a random mole to pop-up

  //First things first, remove any old click handlers and styles as we are picking a new mole.
  $('.mole').off('click');
  $('.mole').css('background-color','blue');

  //This is a new mole, reset the variable so we can tell if this mole was clicked.
  moleClicked = false;

  //Pick a new target mole and style it so that we can see it
  targetMole = Math.floor((Math.random() * $('.mole').length));
  targetMole = "#"+targetMole;
  $(targetMole).css("background-color","red");

  //Add a click handler to our target mole that, when clicked, sets our flag and changes the style.
  $(targetMole).click(function(){
    moleClicked=true;
    $(this).css("background-color","green");
  });
}

function gameLoop() {
  //We will call this function over and over until the game is over.

  //determine if a mole was clicked
  if(moleClicked) {
    score = score + 1
  } else {
    lives = lives - 1
  }

  //pick a new mole to pop-up
  selectMole();

  //each time we go call this gameloop function, we make the moles appear faster!
  delayMilliseconds = Math.max(delayMilliseconds - 50,100);

  if(lives == 0) {
    //the game ends as we are out of lives, update the scoreboard but do not call the gameLoop function!
    $('#scoreBoard').text("You did great! Final Score:" + score);
  } else {
    displayScore()
    setTimeout(gameLoop, delayMilliseconds)
  }
}

$('#startBtn').click(function() {
  //reset game
  $('.mole').off('click');
  $('.mole').css('background-color','blue');
  score = 0;
  lives = 3;
  delayMilliseconds = 2000;
  moleClicked=false;

  displayScore();
  selectMole();

  setTimeout(gameLoop, delayMilliseconds);
});
