// declare all global variables
var guessCounter = 12;
var winCounter = 0;
var words = ["terezi", "davesprite", "karkat", "vriska", "ferferi", "rose", "kanaya", "gamzee", "sollux", "eridan", ];
var activeWord = "";
var splitWord = [];
var wordBlank = [];
var userInput = "";
var guessedLetters = [];
var isGuessed;
var word = document.getElementById("word");
var correctGuesses = [];
var hasWon;

// set up the game by clicking the start button
document.getElementById("start").onclick = function(event) {
    resetGame();
};

// reset and launch a game with a new word and 12 new guesses by clicking the reset game button
document.getElementById("reset").onclick = function(event) {
	resetGame();
	winCounter = 0;
	document.getElementById("wins").innerHTML = "Wins:" + winCounter;
};

// launch function to connect user keyboard input to gameplay
document.onkeyup = function(event) {
    userInput = event.key;
    replaceBlanks();

};


// below are functions associated with gameplay
// randomly selects a word from the words array and stores it into the activeWord variable
function pickWords() {
    activeWord = words[Math.floor(Math.random() * words.length)];
};

// splits the string into an array with one letter per index and stores it as a new variable
function splitWords() {
    splitWord = activeWord.split("");
};

// loops over the split array to put one underscore per character into a series of <span> tags
// this displays the blanks
function makeBlanks() {
    for (i = 0; i < splitWord.length; i++) {
        var blankSpan = document.createElement("span");
        blankSpan.innerHTML = "_ ";
        blankSpan.classList.add("blank");
        word.appendChild(blankSpan);
    };
};

// picks a word, splits it into an array, and displays the blank spaces on the screen
function startGame() {
    pickWords();
    splitWords();
    makeBlanks();

};


// resets guess counter, guessed letters, and removes span elements. Uses startGame function to launch a new game
function resetGame() {
	    while (word.firstChild) {
        word.removeChild(word.firstChild);
    };
    startGame();
    guessCounter = 15;
    document.getElementById("guesses").innerHTML = "Guesses remaining: " + guessCounter;
    guessedLetters = [];
    correctGuesses = [];
    hasWon = false;
};

// compare two arrays to see if their content is identical or not
Array.prototype.compare = function(testArr) {
    if (this.length != testArr.length) return false;
    for (var i = 0; i < testArr.length; i++) {
        if (this[i].compare) { 
            if (!this[i].compare(testArr[i])) return false;
        }
        else if (this[i] !== testArr[i]) return false;
    }
    return true;
};



// replace the blanks with the selected letter, lower the guess counter if the user has not previously guessed that letter
function replaceBlanks() {
    if (guessedLetters.length > 0) {
        guessedLetters.forEach(function(element) {
            if (element === userInput) {
                isGuessed = true;
            } else {
                isGuessed = false;
            };
        });
        if (isGuessed === false) {
            guessCounter--;
            document.getElementById("guesses").innerHTML = "Guesses remaining: " + guessCounter;
        };
    } else if (guessedLetters.length === 0) {
        guessCounter--;
        document.getElementById("guesses").innerHTML = "Guesses remaining: " + guessCounter;
    };
    // push guessed letters to an array
    guessedLetters.push(userInput);


    // loop over the length of splitword to see if there's a match, if there's a match, replace the correct span w userinput, and
    // push userInput to an array of correct guesses
    for (i = 0; i < splitWord.length; i++) {
        if (userInput === splitWord[i]) {      	
            word.childNodes[i].innerHTML = userInput + " ";
            correctGuesses.push(userInput);

            
        };

    };
    // copy the correct guesses array and the split word array
    	var guessedClone = correctGuesses.slice(0);
		var splitClone = splitWord.slice(0);
	// use sorting algorithm to see if they contain the same letters
   			if(guessedClone.sort().compare(splitClone.sort())) {
   	// if they do, set hasWon to true
    		hasWon = true;
}
	else {
		hasWon = false
	};


        if (hasWon === true) {
    	document.getElementById("guesses").innerHTML = "You win";
    	winCounter++;
    	document.getElementById("wins").innerHTML = "Wins:" + winCounter;
    };




    
    // if the guess counter reaches zero, inform the player that they have lost the game
    if (guessCounter === 0) {
        document.getElementById("guesses").innerHTML = "You lose";
    };
};
