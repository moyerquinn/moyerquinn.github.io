/* global $, sessionStorage*/

$(document).ready(
 
  function(){
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// INITIALIZATION ///////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // HTML jQuery Objects
  function Element(x, y, speedX, speedY, selector) {
    var element = {};
    element.x = x;
    element.y = y;
    element.speedX = speedX;
    element.speedY = speedY;
    element.$element = $(selector);
    return element;
  }
  
  var paddleLeft = Element(25, 213, 0, 0, '#paddleRight');
  var paddleRight = Element(500, 213, 0, 0, '#paddleLeft');
  var ball = Element(250, 250, 0, 0, '#ball');
  
  // Constant Variables
  var PADDLE_HEIGHT = paddleLeft.$element.height();
  var PADDLE_WIDTH = paddleLeft.$element.width();
  var BALL_HEIGHT = ball.$element.height();
  var BALL_WIDTH = BALL_HEIGHT
  var FPS = 60;
  var BOARD_WIDTH = $("#board").width();
  var BOARD_HEIGHT = $("#board").height();
  var KEY = {
    'ENTER': 13,
    'SPACEBAR':32,
    'LEFT':37,
    'UP':38,
    'RIGHT':39,
    'DOWN':40,
    'W':87,
    "A":65,
    'S':83,
    'D':68
  };
  // $(":button").css("background-color", "#8c8e96");
  
  
  
  
  // other game variables

  var rally = 0;
  var leftPoints = 0;
  var rightPoints = 0;
  var gameNumber = 1;
  var leftWins = 0;
  var rightWins = 0;
  
  
  // interval variable required for stopping the update function when the game ends
  var updateInterval;

  turnOnEvents();
  
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  * Called once per "interval"
  */
  function update() {
    limitMovement();
    moveGameItem(paddleLeft);
    moveGameItem(paddleRight);
    moveGameItem(ball);
    bounce(ball);
    endgame(ball);
    
    if (doCollide(paddleLeft, ball) || doCollide(paddleRight, ball)) {
      shiftX(ball);
      reflect(ball);
    }
  }
  
  

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  
  function startGame() {
    ball.speedX = getRandoX();
    ball.speedY = getRandoY();
  }
  
 function getRandoX() {
   var randoX = 0;
   randoX = (Math.random() * 8) - 4;
   if (randoX < 2 && randoX > 0) {
     randoX += 2;
   }  else if (randoX < 0 && randoX > -2) {
     randoX -= 2;
   }
   return randoX;
  }
  
  function getRandoY() {
    var randoY = 0;
    randoY = (Math.random() * 5) - 2.5;
    if (randoY < 1 && randoY > 0) {
      randoY += 1;
    } else if (randoY < 0 && randoY > -1) {
      randoY -= 1;
    }
    return randoY;
  }
  
  function moveGameItem(Item) {
    Item.y += Item.speedY;
    Item.$element.css("top", Item.y); 
    
    Item.x += Item.speedX;
    Item.$element.css("left", Item.x);
    
    
  }
  
  function limitMovement() {
    if (paddleLeft.y + PADDLE_HEIGHT > BOARD_WIDTH) {
  	  paddleLeft.y = BOARD_WIDTH - PADDLE_HEIGHT;
    }
  	if (paddleLeft.y < 0) {
  	  paddleLeft.y = 0;
  	}
  	if (paddleRight.y + PADDLE_HEIGHT > BOARD_HEIGHT) {
  	  paddleRight.y = BOARD_HEIGHT - PADDLE_HEIGHT;
  	}
  	if (paddleRight.y < 0) {
  	  paddleRight.y = 0;
  	}
    
  }
  
  function doCollide(obj1, obj2) {
    obj1.leftX = obj1.x;  
    obj1.topY = obj1.y;
    obj1.rightX = obj1.x + obj1.$element.width();
    obj1.bottomY = obj1.y + obj1.$element.height();

    obj2.leftX = obj2.x;
    obj2.topY = obj2.y;
    obj2.rightX = obj2.x + obj2.$element.width();
    obj2.bottomY = obj2.y + obj2.$element.height();

    if (obj1.leftX > obj2.rightX || obj1.rightX < obj2.leftX || obj1.topY > obj2.bottomY || obj1.bottomY < obj2.topY) {
      return false;
    } else {
       return true;
    }
  }
  
  function detectPaddle() {
    if (ball.x < BOARD_WIDTH / 2) {
        return paddleLeft;
    } else {
        return paddleRight;
    }
  }
  
  function reflect(ball) {
    if (ball.speedX >= 10 || ball.speedX <= -10) {
      ball.speedX *= -1;
    } else {
      ball.speedX *= -1.1;
    }

    paddleRight.midY = paddleRight.y + 62.5; 
    paddleLeft.midY = paddleLeft.y + 62.5;
    ball.midY = ball.y + 25;
    
    if (ball.midY > detectPaddle().midY) {
      ball.speedY = 3;
    } else {
      ball.speedY = -3; 
    }
    
    rally++;
    $(".rallyNumber").text("Rally : " + rally);
  }
  
  
  ///
  ///
  ///
  /// PROBLEM TO SOLVE:
  /// shift function doesn't work
  ///   It doesn't break anything, but it also doesn't seem to be doing anything
  ///   The goal of this function is to translate the ball away from the paddle upon
  ///     hitting it to avoid the repetive hitting glitch
  /// shift still doesn't work 100%
  ///
  ///
  ///
  
  function shiftX(ball) {
    if (ball.x + ball.width > 500) { //paddleRight.x ((temp hardcoded))
  	  ball.x = paddleRight.x - BALL_WIDTH; 
  	} else if (ball.x < 50) { //paddleLeft.x + PADDLE_WIDTH ((temp hardcoded))
  	    ball.x = paddleLeft.x + PADDLE_WIDTH;
  	}
  }
  
  
  
  function bounce(ball) {
    if (ball.y + BALL_HEIGHT > BOARD_HEIGHT) {
  	  ball.speedY *= -1;
  	} else if (ball.y < 0) {
  	  ball.speedY *= -1;
  	}
  }
  
  
  
  function resetGame() {
    ball.x = 250;
    ball.y = 250;
    ball.speedX = 0;
    ball.speedY = 0;
    rally = 0;
    paddleRight.y = 213
    paddleLeft.y = 213
    $(".rallyNumber").text("Rally : " + rally);
  }
  
  function addPointsLeft(){
    $(".pointsLeft").text("Points : " + leftPoints);
  }
  function addPointsRight(){
    $(".pointsRight").text("Points : " + rightPoints);
  }
  
  
  
  function rightWin(){
    rightWins++;
    $(".rightWins").text("Wins : " + rightWins);
    gameNumber++;
    $(".gameNumber").text("Game : " + gameNumber);
  }
  
  function leftWin(){
    leftWins++;
    $(".leftWins").text("Wins : " + leftWins);
    gameNumber++;
    $(".gameNumber").text("Game : " + gameNumber);
  }
  
  
  // function if_player_win(winingSide){
  //   if (winingSide === winsLeft){
  //   $(".winsLeft").text("Wins : " + winingSide);
  //   } else {
  //   $(".winsRight").text("Wins : " + winingSide);
  //   }
    
  //   gameNumber++;
  //   $(".gameNumber").text("Game : " + gameNumber);
  // }
  
  function endgame(ball) {
    if (ball.x < 0) {
      rightPoints++;
      
      if (rightPoints === 5){
        rightWin();
        rightPoints = 0;
        leftPoints = 0;
        $(".pointsRight").text("Points : " + rightPoints);
        $(".pointsLeft").text("Points : " + leftPoints);
      } else{
        addPointsRight();
      }
      resetGame();
    } else if (ball.x > BOARD_WIDTH - BALL_HEIGHT) {
      leftPoints++;
      
      if (leftPoints === 5){
        leftWin();
        leftPoints = 0;
        rightPoints = 0;
        $(".pointsLeft").text("Points : " + leftPoints);
        $(".pointsRight").text("Points : " + rightPoints);
      } else{
        addPointsLeft();
      }
      resetGame();
    }
  }
  
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// EVENT HANDLERS //////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
   function turnOnEvents() {
      // start the interval timer
    updateInterval = setInterval(update, 1000 / FPS);
      // turn on event handlers
    $(document).on('keydown', handleKeyDown);
    $(document).on('keyup', handleKeyUp);  
      
    }
    
  function handleKeyDown(event) {
    var keycode = event.which;
    if (keycode === KEY.W) {
      paddleLeft.speedY = -5;
    }  
    if (keycode === KEY.S) {
      paddleLeft.speedY = 5;
    }  
    if (keycode === KEY.UP) {
      paddleRight.speedY = -5;
    }   
    if (keycode === KEY.DOWN) {
      paddleRight.speedY = 5;
    }   
    
  }
  
  function handleKeyUp(event) {
    var keycode = event.which;
    if (keycode === KEY.W) {
      paddleLeft.speedY = 0;
    }  
    if (keycode === KEY.S) {
      paddleLeft.speedY = 0;
    }  
    if (keycode === KEY.UP) {
      paddleRight.speedY = 0;
    }   
    if (keycode === KEY.DOWN) {
      paddleRight.speedY = 0;
    }  
    if (keycode === KEY.SPACEBAR && ball.speedX === 0 && ball.speedY === 0) {
      startGame();
    }
  }
  
 

  function turnOffEvents() {
    // stop the interval timer
    clearInterval(updateInterval);

    // turn off event handlers
    $(document).off();
  }
  
}

);