/* global $, sessionStorage*/

$(document).ready(function(){
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// INITIALIZATION ///////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // HTML jQuery Objects
  var $gameItemElement = $("#gameItem");

  // Constant Variables
  var GAME_ITEM_SIZE = $gameItemElement.width();
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
  
  var player = {};
  player.positionX = 0; // the x-coordinate location for the box
  player.positionY = 0; // the y-coordinate location for the box  
  player.speedX = 0; // the speed for the box along the x-axis
  player.speedY = 0; // the speed for the box along the y-axis
  player.$element = $("#gameItem");
  
  var positionX = 0; // the x-coordinate location for the box
  var positionY = 0; // the y-coordinate location for the box  
  var speedX = 0; // the speed for the box along the x-axis
  var speedY = 0; // the speed for the box along the y-axis
  

  // other game variables

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
    moveGameItem();
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  
  function moveGameItem() {
    positionX += speedX;
    $gameItemElement.css("left", positionX);
    
    positionY += speedY;
    $gameItemElement.css("top", positionY); 
  }
  
  function limitMovement() {
    if (positionX + GAME_ITEM_SIZE > BOARD_WIDTH) {
  	  positionX = BOARD_WIDTH - GAME_ITEM_SIZE;
  	}
  	if (positionX < 0) {
  	  positionX = 0;
  	}
  	 if (positionY + GAME_ITEM_SIZE > BOARD_HEIGHT) {
  	  positionY = BOARD_HEIGHT - GAME_ITEM_SIZE;
  	}
  	if (positionY < 0) {
  	  positionY = 0;
  	}
  }
  
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// EVENT HANDLERS //////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function handleKeyDown(event) {
    var keycode = event.which;
    if (keycode === KEY.LEFT) {
      speedX = -5;
    }  
    if (keycode === KEY.RIGHT) {
      speedX = 5;
    }  
    if (keycode === KEY.UP) {
      speedY = -5;
    }   
    if (keycode === KEY.DOWN) {
      speedY = 5;
    }   
  }
  function handleKeyUp(event) {
    var keycode = event.which;
    if (keycode === KEY.LEFT) {
      speedX = 0;
    }  
    if (keycode === KEY.RIGHT) {
      speedX = 0;
    }  
    if (keycode === KEY.UP) {
      speedY = 0;
    }   
    if (keycode === KEY.DOWN) {
      speedY = 0;
    }   
  }
			
  
  function turnOnEvents() {
    // start the interval timer
    updateInterval = setInterval(update, 1000 / FPS);

    // turn on event handlers
    $(document).on('keydown', handleKeyDown);
    $(document).on('keyup', handleKeyUp);
  }

  function turnOffEvents() {
    // stop the interval timer
    clearInterval(updateInterval);

    // turn off event handlers
    $(document).off();
  }
  
});
