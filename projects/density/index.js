/* global $, sessionStorage*/

$(document).ready(function(){

////////////////////////////////////////
////////// INITIALIZATION //////////////
////////////////////////////////////////

var FPS = 60;
var BOARD_WIDTH = 400;
var BOARD_HEIGHT = 400;
var BALL_SIZE = 20; 
var BALL_MAX = {
    "LEFT": 0,
    "RIGHT": BOARD_WIDTH - BALL_SIZE,
    "TOP": 0,
    "BOTTOM": BOARD_HEIGHT - BALL_SIZE
}

// factory for making Balloon objects
function Ball($element) {
    var ball = {};
    ball.$element = $element;
    ball.x = randomLocation();
    ball.y = randomLocation();
    ball.velocityX = randomVelocity();
    ball.velocityY = randomVelocity();
    return ball;
}

// create the first ball
var $ball0Element = $(".ball");
var ball0 = Ball($ball0Element);


// TODO: Create an Array to manage all ball 
// and push the first ball into the array
var balls = [ball0];

////////////////////////////////////////
////////// CORE LOGIC //////////////////
////////////////////////////////////////

$("button").on('click', addNewBallToBoard);
setInterval(update, 1000 / FPS);

function update() {
    // TODO: Once an array is created, iterate through
    // the array and move and bounce each balloon
    for (var i = 0; i < balls.length; i++) {
        moveBall(balls[i]);
        detectBounce(balls[i]);
        for (var e = 0; i < balls.length; e++) {
            doCollide(balls[i], balls[e]);
        }
    }
}

function addNewBallToBoard() {  
    // TODO: Complete this function such that when
    // the button is pressed, a new <div> is created
    // with class="ball", is added to the board
    var $ballElement = $("<div>").addClass("ball").appendTo("#board");

    
    // TODO: Create a new Ball factory object and
    // pass in the new jQuery element you just created
    // as the selector argument
    var newBall = Ball($ballElement);
    balls.push(newBall);
}

////////////////////////////////////////
////////// HELPER FUNCTIONS ////////////
////////////////////////////////////////

// return a value between -5 and 5
function randomVelocity() {
    return Math.random() * 10 - 5;
}

function randomLocation() {
    return Math.random() * BOARD_WIDTH;
}

function moveBall(ball) {
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    ball.$element.css("left", ball.x);
    ball.$element.css("top", ball.y);
}

function detectBounce(ball) {
    if (ball.x > BALL_MAX.RIGHT) {
        ball.x = BALL_MAX.RIGHT;
        ball.velocityX *= -1;
    }
    else if (ball.x < BALL_MAX.LEFT) {
        ball.x = BALL_MAX.LEFT;
        ball.velocityX *= -1;
    }
    else if (ball.y < BALL_MAX.TOP) {
        ball.y = BALL_MAX.TOP;
        ball.velocityY *= -1;
    }
    else if (ball.y > BALL_MAX.BOTTOM) {
        ball.y = BALL_MAX.BOTTOM;
        ball.velocityY *= -1;
    }
}

function doCollide(obj1, obj2) {
    obj1.leftX = obj1.x;
    obj1.topY = obj1.y;
    obj1.rightX = obj1.x + 20;
    obj1.bottomY = obj1.y + 20;

    obj2.leftX = obj2.x;
    obj2.topY = obj2.y;
    obj2.rightX = obj2.x + 20;
    obj2.bottomY = obj2.y + 20;

    if (obj1.leftX > obj2.rightX || obj1.rightX < obj2.leftX) {
        obj1.velocityX *= -1;
        obj2.velocityX *= -1;
    }
    
    if (obj1.topY > obj2.bottomY || obj1.bottomY < obj2.topY) {
        obj1.velocityY *= -1;
        obj2.velocityY *= -1;
    }
}
    
});