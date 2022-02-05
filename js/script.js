const guessedLetters = document.querySelector(".guessed-letter");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia";

// Display dots as placeholders for each letter of the word.

function wordPlaceholder(word) {
    const letterPlaceholders = [];
    for (const letter of word) {
        console.log(letter);
        letterPlaceholders.push("●");
    }
    wordInProgress.innerText = letterPlaceholders.join("");
};

wordPlaceholder(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    let guess = letterInput.value;
    console.log(guess);
    letterInput.value = "";
});