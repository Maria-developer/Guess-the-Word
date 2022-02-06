const guessedLettersElement = document.querySelector(".guessed-letter");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia";
const guessedLetters = [];


// --------------- Display dots as placeholders for each letter of the word ---------------

function wordPlaceholder(word) {

    // Use an empty array to add items
    // Each letter of the word will become an item in this array
    const letterPlaceholders = [];

    // Loop over the letters in the array
    for (const letter of word) {

        // Log out each letter to the console
        console.log(letter);
        // Example (in console):
        // m
        // a
        // g
        // n
        // o
        // l
        // i
        // a

        // Make the value of each item display on the page as a dot instead of a letter
        letterPlaceholders.push("●");
        // Example: ●, ●, ●, ●, ●, ●, ●, ●
    }

    // Joins placeholder dots side by side, so they aren't separated by commas
    wordInProgress.innerText = letterPlaceholders.join("");
    // Example: ● ● ● ● ● ● ● ●
};

// Call this function and pass it the word variable as an argument
// Displays word placeholder with enough dots to represent each letter
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
    // If invalid, a message will appear based on the validate() function's conditions below
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
        message.innerText = "Please enter a single letter."
    }

    // If input doesn't match any accepted values, instruct player to enter a letter from A to Z
    else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A to Z."
    }

    // If none of the above conditions are met, return the inputted letter
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
        message.innerText = "You already guessed that letter. Please try again."
    }

    // If player guesses a letter they haven't already guessed, add it to guessedLetters array
    else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};