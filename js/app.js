$(document).ready(function(){

	var DEBUG_MODE = true;
	var number;
	var prevGuess;
	var numGuesses;

	var debug = function(msg) {
		if (DEBUG_MODE = true) {
			console.log('DEBUG:', msg);
		}
	}

	function newGame() {
		debug('newgame called');
		setNumber();
		prevGuess = 0;
		numGuesses = 0;
		$('#guessList').empty();
		$('#feedback').text('Make your Guess!');
		$('#count').text('0');
		$('#userGuess').val('');
	}
	newGame();

	function setNumber() {
		number = Math.floor((Math.random() * 100) + 1);
		debug('number: ' + number);
	}	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});


	$('.new').click(function() {  
		newGame();
	});

	$('#guessButton').click(function () {
		submitGuess();
	});

	$(document).keydown(function(event) {
		if (event.keyCode == 10 || event.keyCode == 13) {
			event.preventDefault();
			submitGuess();
		}
	});	

	$('form').submit(function(event){
		event.preventDefault();  
	});

	function submitGuess () {
		var guess = $('#userGuess').val();
		if (isNaN(guess)) 
		{
			alert('Please enter a number');
			return false;
		}	
		if(guess % 1 != 0) {
			alert('Please enter an integer');
			return false;
		}
		if(guess < 1 || guess > 100) {
			alert('Please enter a number between 1 and 100');
		}
		$('#count').text(++numGuesses);
		$('#feedback').text(getGuessResult(guess));		
		prevGuess = guess;			
		$('#guessList').append('<li>' + guess + '</li>');		
	}

	function getGuessResult(guess) {
		debug('logGuess called. number: ' + number + ' guess: ' + guess + ' prevGuess: ' + prevGuess + ' guessDifference: ' + Math.abs(number - guess));
		var guessResult = "";
		
		if(prevGuess != 0){
			if (Math.abs(number - guess) == 0) {
				guessResult = "You Got It!";
			}
			else if(Math.abs(number - guess) < Math.abs(number - prevGuess)) {
				guessResult = "Warmer";
				
			}
			else {
				guessResult = "Colder";
			}	
		}
		else {
			if (Math.abs(number - guess) >= 50) {
				guessResult = "Ice Cold";
			}
			else if (Math.abs(number - guess) >= 30) {
				guessResult = "Cold";
			}
			else if (Math.abs(number - guess) >= 20) {
				guessResult = "Warm";
			}
			else if (Math.abs(number - guess) >= 10) {
				guessResult = "Hot";
			}
			else if(Math.abs(number - guess) >= 1) {
				guessResult = "Very Hot";
			}
			else {
				guessResult = "You Got It!";
			}
		}
		return guessResult;
	}	
});


