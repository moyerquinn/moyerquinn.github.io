/* global $, sessionStorage*/

$(document).ready(function(){
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// INITIALIZATION ///////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FPS = 60;
  var BOARD_WIDTH = $("#board").width();
  var BOARD_HEIGHT = $("#board").height();
  var KEY = {
    'ENTER': 13,
    'LEFT':37,
    'UP':38,
    'RIGHT':39,
    'DOWN':40
  };
  var score = 0 
  var BOARD_SIZE = $("#board").width();
  var SQUARE_SIZE = $("#head").width();
  
  // HTML jQuery Objects
  
  function GameItem(x, y, speedX, speedY, selector) {
    var item = {};
    item.x = x;
    item.y = y;
    item.speedX = speedX;
    item.speedY = speedY;
    item.$element = $(selector);
    return item;
  }
  
  // other game variables
  
  var head = GameItem(80, 20, 0, 0, $('#head'));
  var apple = GameItem(40, 200, 0, 0, $('#apple'));
  var snakeBod = GameItem(head.x,head.y,0,0,$('#snake'))
  
  var snakeBody = [head];
  snakeBody.push(head);
  
  
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
    
    // move snake body first!
    moveSnakeHead();
    moveSnakeBody();
    
    if(doCollide(head, apple)) {
      score++
      $("#score").text("Score  " + score);
      moveApple();
      addPiece();
      
    }
  }
  
  /* 
  * Game start
  */
  
  randLocation(apple);
  draw(apple);
  
  randLocation(head);
  draw(head);

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  
  function randLocation(obj) {
    obj.x = Math.floor(Math.random() * 22) * 20;
    obj.y = randomInteger(BOARD_SIZE / SQUARE_SIZE) * SQUARE_SIZE;
  }
  
  function draw(obj) {
    obj.$element.css("left", obj.x);
    obj.$element.css("top", obj.y);
  }
  
  function moveSnakeBody() {
    // iterate backwards: think of a catarpillar scrunching the tail 
    // towards the head before extending the head away
    for( var i = snakeBody.length-1; i > 0; i--){
      snakeBody[i].x = snakeBody[i-1].x;
      snakeBody[i].y = snakeBody[i-1].y;
      draw(snakeBody[i]);
    }
  }
  
  function moveSnakeHead() {
    head.x += head.speedX;
    head.y += head.speedY;
    draw(head);
  }
  
  function randomInteger(max) {
    var randomInt = Math.floor(Math.random() * max);
    return randomInt;
  }
  
  function moveApple() {
    // change the apple's data
    randLocation(apple);
    draw(apple);
    
    // check if the x/y location is occupied by the snake
    var doesCollide = false
    for (var i = 0; i < snakeBody.length; i++) {
        if (doCollide(apple, snakeBody[i])) {
            doesCollide = true;
        }
    }
    
    // recursive case: move the apple again
    if (doesCollide) {  
        moveApple(); 
    } 
  }
  
  function limitMovement() {
    if (head.x + head.$element.width() > BOARD_WIDTH) {
  	  head.x = BOARD_WIDTH - head.$element.width();
  	}
  	if (head.x < 0) {
  	  head.x = 0;
  	}
  	 if (head.y + head.$element.height() > BOARD_HEIGHT) {
  	  head.y = BOARD_HEIGHT - head.$element.height();
  	}
  	if (head.y < 0) {
  	  head.y = 0;
  	}
  }
  
  function addPiece() {
    // make a GameItem for that element (back end) 
    var $snakeElement = $("<div>")
        .addClass("snake")
        .appendTo("#board");
    
    // push GameItem into to snakeBody
    var newSnakePiece = snakeBody($snakeElement);
    snakeBody.push(newSnakePiece);
    
    // draw element (front end)
    draw(newSnakePiece);
    newSnakePiece.x = snakeBody[snakeBody.length - 1].x;
    newSnakePiece.y = snakeBody[snakeBody.length - 1].y;
    
  }
  
  function doCollide(obj1, obj2) {
    if (obj1.x === obj2.x && obj1.y === obj2.y) {
      return true;
    } else {
      return false;
    }
  }
  
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// EVENT HANDLERS //////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function handleKeyDown(event) {
    var keycode = event.which;
    if (keycode === KEY.LEFT && head.speedX !== 20) {
      head.speedY = 0;
      head.speedX = -20;
    }  
    else if (keycode === KEY.RIGHT && head.speedX !== -20) {
      head.speedY = 0;
      head.speedX = 20;
    }  
    else if (keycode === KEY.UP && head.speedY !== 20) {
      head.speedX = 0;
      head.speedY = -20;
    }   
    else if (keycode === KEY.DOWN && head.speedY !== -20) {
      head.speedX = 0;
      head.speedY = 20;
    }   
  }
  
  function turnOnEvents() {
    // start the interval timer
    updateInterval = setInterval(update, 5000 / FPS);

    // turn on event handlers
    
    // $(document).on('click', handleEvent);
    $(document).on('keydown', handleKeyDown);
  }

  function turnOffEvents() {
    // stop the interval timer
    clearInterval(updateInterval);

    // turn off event handlers
    $(document).off();
  }
  
});