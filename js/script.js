const guessedLettersList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
let letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesParagraph = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;


// --------------- Get a random word ---------------

async function getWord () {

    // Fetch list of words from linked text file
    const wordList = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await wordList.text();

    // Transform fetched words into an array, separating each word with a newline (line break)
    const wordArray = words.split("\n");

    // Pull a random index from the wordArray
    const randomIndex = Math.floor(Math.random() * wordArray.length);

    // Pull the corresponding random word by:
        // Reassigning the global word variable, so it becomes the word found at the randomIndex
        // Remove any extra whitespace around the word in the text file by using trim
    word = wordArray[randomIndex].trim();

    // Diaplay a placeholder for the random word, a dot representing each letter
    wordPlaceholder(word);

    letterInput.focus();
};

// Fire off the game
getWord();


// --------------- Display dots as placeholders for each letter of the word ---------------

function wordPlaceholder(word) {

    // Use an empty array to add items
    // Each letter of the word will become an item in this array
    const letterPlaceholder = [];

    // Loop over each letter in the array one at a time
    for (const letter of word) {

        // For every loop of a letter, log that letter in the console
        console.log(letter);
        // Example output (in console):
        // m
        // a
        // g
        // n
        // o
        // l
        // i
        // a

        // Each time a letter is logged, add a dot to the end of the array
        letterPlaceholder.push("●");
        // For example, when "m" is looped, "m" is logged in the console and a dot is pushed to the array
        // When "a" is looped, "a" is logged and another dot is added to the end
        // This continues until every letter in the array is looped over, pushing as many dots as there are letters to the array
        // Example output (on webpage): ●, ●, ●, ●, ●, ●, ●, ●
    }

    // Join placeholder dots side by side, so they aren't separated by commas
    wordInProgress.innerText = letterPlaceholder.join("");
    // Example output (on webpage): ● ● ● ● ● ● ● ●
};

// Call function with word argument to display placeholders for each letter
wordPlaceholder(word);


// --------------- When Guess button is clicked ---------------

guessButton.addEventListener("click", function (e) {

    // Prevent default form behaviour (submitting form and reloading page) when button is clicked
    e.preventDefault();

    // Empty message
    message.innerText = "";

    // Grab input entered by player
    const guess = letterInput.value;

    // Confirm input is valid (input must be a single letter, input must not be empty)
    // If invalid, a message will appear based on the validate() function's conditions
    const validGuess = validate(guess);

    // If valid, log player's guess
    if (validGuess) {
        makeGuess(guess);
    }

    // Empty input value, so the next guess can be entered
    letterInput.value = "";
});


// --------------- Validate player's input ---------------

function validate(input) {

    // An acceptable input is a letter from A to Z
    const acceptedLetter = /[a-zA-Z]/;

    // If input is empty, instruct player to enter a letter
    if (input.length === 0) {
        message.innerText = "Please enter a letter.";
    }

    // If input is more than one letter, instruct player to enter a single letter
    else if (input.length > 1) {
        message.innerText = "Please enter a single letter.";
    }

    // If input doesn't match any accepted values, instruct player to enter a letter from A to Z
    else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A to Z.";
    }

    // If none of the above conditions are met, return the submitted letter
    else {
        return input;
    }
};


// --------------- Log player's input ---------------

function makeGuess(guess) {

    // Convert all guesses to uppercase to avoid case-sensitivity issues
    guess = guess.toUpperCase();

    // If player guesses the same letter again, notify them
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter. Please try again.";
    }

    // If player guesses a letter they haven't already guessed, add it to the guessedLetters array
    else {
        guessedLetters.push(guess);
        console.log(guessedLetters);

        // Display guessed letters list on page
        showGuessedLetters();

        // Update number of remaining lives
        updateRemainingGuesses(guess);

        // Update word in progress based on player's guesses
        updateWordInProgress(guessedLetters);
    }
};


// --------------- Show guessed letters ---------------

function showGuessedLetters() {

    // First, clear guessed letters list
    guessedLettersList.innerHTML = "";

    // Make each guessed letter a list item
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;

        // Add each letter to the guessed letters list
        guessedLettersList.append(li);
    }
};


// --------------- Update word in progress based on player's guesses ---------------

function updateWordInProgress(guessedLetters) {

    // Change word variable to uppercase
    const wordUpper = word.toUpperCase();

    // Split word string into an array of letters
    const wordArray = wordUpper.split("");

    // Add letters to a new array
    const revealWord = [];

    // Loop over each letter
    for (const letter of wordArray) {

        // If the guessedLetters array contains the letter being looped, replace the dot placeholder with the correct letter
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter);
        } 

        // If the guessedLetters array does not include the looped letter, continue to display a dot placeholder at that index
        else {
            revealWord.push("●");
        }

    // Join correct letters and placeholders into a string to show updated word in progress
    wordInProgress.innerText = revealWord.join("");

    // Check if player won
    checkIfWin();
    }
};


// --------------- Update number of remaining lives ---------------

function updateRemainingGuesses(guess) {

    // Make sure word is uppercase to avoid case-sensitivity issues
    const upperWord = word.toUpperCase();

    // If the word doesn't include the letter guessed, let the player know and subtract one life
    if (!upperWord.includes(guess)) {
        message.innerText = `Sorry, there is no ${guess}.`;
        remainingGuesses -= 1;
    } 
    // If the word does include the letter guessed, tell the player they guessed correctly
    else {
        message.innerText = `Good guess! This word includes the letter ${guess}.`;
    }

    // If there are no lives remaining, say it's game over and tell the player what the word was
    // Show Play Again button
    if (remainingGuesses === 0) {
        message.innerText = `Game over. The word was ${upperWord}.`;
        startOver();
    }
    // Let the player know if there's only one life left
    else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} life remaining`;
    }
    // If there's more than one life left, tell them how many lives are remaining
    else {
        remainingGuessesSpan.innerText = `${remainingGuesses} lives remaining`;
    }
};


// --------------- Check if player won ---------------

function checkIfWin () {

    // Check if the word in uppercase (to avoid case-sinsitivity issues) matches wordInProgress (already uppercase)
    if (word.toUpperCase() === wordInProgress.innerText) {

        // If so, add win class and display a message letting the player know they won
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the word! Congrats!</p>`;

        // Show Play Again button if player wins
        startOver();
    }
};


// --------------- Show Play Again button when game ends ---------------

function startOver () {

    // Hide Guess button, remaining guesses, and guessed letters
    guessButton.classList.add("hide");
    remainingGuessesParagraph.classList.add("hide");
    guessedLettersList.classList.add("hide");

    // Show Play Again button
    playAgainButton.classList.remove("hide");
};


// --------------- When Play Again button is clicked ---------------

playAgainButton.addEventListener("click", function () {

    // Remove win class
    message.classList.remove("win");

    // Empty the guessedLetters array
    guessedLetters = [];

    // Set remaining guesses back to 8
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;

    // Empty message text and guessed letters list
    guessedLettersList.innerHTML = "";
    message.innerText = "";

    // Grab a new word
    getWord();

    // Show Guess button
    guessButton.classList.remove("hide");

    // Hide Play Again button
    playAgainButton.classList.add("hide");

    // Show remaining guesses and guessed letters
    remainingGuessesParagraph.classList.remove("hide");
    guessedLettersList.classList.remove("hide");

    letterInput.focus();
});