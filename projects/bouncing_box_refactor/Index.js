/* global $ */
'use strict'
$(document).ready(function() {
	//////////////////////////////////////////////////////////////////
	/////////////////// Intilzation///////////////////////////////////
	//////////////////////////////////////////////////////////////////

	var $box = $('.box'); // reference to the HTML .box element
	var boardWidth = $('.board').width(); // the maximum X-Coordinate of the screen

	// Every 50 milliseconds, call the update Function (see below)
	setInterval(update, 50);

	// Every time the box is clicked, call the handleBoxClick Function (see below)
	$box.on('click', handleBoxClick);

	//////////////////////////////////////////////////////////////////
	/////////////////// Core Logic ///////////////////////////////////
	//////////////////////////////////////////////////////////////////

	/** 
	Variable declarations/initialization should be in the initialization section
	*/
	var speedX = 10;
	var positionX = 0;
	var points = 0;

	/* 
	This Function will be called 20 times/second. Each time it is called,
	it should move the Box to a new location. If the box drifts off the screen
	turn it around! 
	*/
	function update() {
		givSpeed();
		$box.css("left", positionX);
		changeDirection();
	};

	/* 
	This Function will be called each time the box is clicked. Each time it is called,
	it should increase the points total, increase the speed, and move the box to
	the left side of the screen.
	*/
	function handleBoxClick(event) {
		console.log(event);
		addPoints();
		addSpeed();
		resetLocation();
	};
	//////////////////////////////////////////////////////////////////
	/////////////////// Helper Functions /////////////////////////////
	//////////////////////////////////////////////////////////////////

	//update()
	function changeDirection() {
		if (positionX > boardWidth) {
			speedX = -speedX;
		}
		else if (positionX < 0) {
			speedX = -speedX;
		}
		else {
			return 'uh oh';
		}
	}
	
	/* the main variable we are setting is positionX, not speedX. If anything, I would call 
	it changePosition()
	
	$box.css("left", positionX); is also part of this process of changing the position of the
	actual DOM element on the screen so I would move that line of code into this function as well.
	*/
	function givSpeed() {
		positionX += speedX;
	}

	// handleBoxClick()	
	function addPoints() {
		points += 1;
		$box.text(points);
	};

	function addSpeed() {
		speedX += 3;
	};

	function resetLocation() {
		positionX = 0;
	};




}); // DO NOT DELETE THIS LINE OF CODE. ALL JAVASCRIPT ABOVE HERE
