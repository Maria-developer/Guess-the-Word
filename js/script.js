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


// Fetch a random word

async function getWord () {
    const wordList = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await wordList.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();

    wordPlaceholder(word);

    letterInput.focus();
};

getWord();


// Display dots as placeholders for each letter of the word

function wordPlaceholder(word) {
    const letterPlaceholder = [];

    for (const letter of word) {
        letterPlaceholder.push("●");
    }

    wordInProgress.innerText = letterPlaceholder.join("");
};

wordPlaceholder(word);


// When Guess button is clicked, validate player's input

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    const guess = letterInput.value;
    const validGuess = validate(guess);

    if (validGuess) {
        makeGuess(guess);
    }

    letterInput.value = "";
});


function validate(input) {
    const acceptedLetter = /[a-zA-Z]/;

    if (input.length === 0) {
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        message.innerText = "Please enter a single letter.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A to Z.";
    } else {
        return input;
    }
};


// Log player's input

function makeGuess(guess) {
    guess = guess.toUpperCase();

    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter. Please try again.";
    } else {
        guessedLetters.push(guess);
        showGuessedLetters();
        updateRemainingGuesses(guess);
        updateWordInProgress(guessedLetters);
    }
};


// Show guessed letters

function showGuessedLetters() {
    guessedLettersList.innerHTML = "";

    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersList.append(li);
    }
};


// Update word in progress

function updateWordInProgress(guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];

    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter);
        } else {
            revealWord.push("●");
        }

    wordInProgress.innerText = revealWord.join("");

    checkIfWin();
    }
};


// Update number of remaining lives

function updateRemainingGuesses(guess) {
    const upperWord = word.toUpperCase();

    if (!upperWord.includes(guess)) {
        message.innerText = `Sorry, there is no ${guess}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good guess! This word includes the letter ${guess}.`;
    }

    if (remainingGuesses === 0) {
        message.innerText = `Game over. The word was ${upperWord}.`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} life remaining`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} lives remaining`;
    }
};


// Check if player won

function checkIfWin () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the word! Congrats!</p>`;
        startOver();
    }
};


// Show Play Again button when game ends

function startOver () {
    guessButton.classList.add("hide");
    remainingGuessesParagraph.classList.add("hide");
    guessedLettersList.classList.add("hide");
    playAgainButton.classList.remove("hide");
};


// When Play Again button is clicked, reset UI and fetch new word

playAgainButton.addEventListener("click", function () {
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessedLettersList.innerHTML = "";
    message.innerText = "";

    getWord();

    guessButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    remainingGuessesParagraph.classList.remove("hide");
    guessedLettersList.classList.remove("hide");

    letterInput.focus();
});