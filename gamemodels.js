const { getRandomSecretWord, isGuessedWordValid, calculateMatchingLetters, isGuessedWordSameAsSecret, } = require('./gamehelpers');

class Game {
    constructor(secretWord) {
        // Initialize game properties
        this.secretWord = secretWord;
        this.numberOfValidGuesses = 0;
        this.guessedWords = [];
        this.isGameWon = false;
        this.message = "Try to guess the secret word!";
    }

    // Check if the word has already been guessed
    guessWord(guessedWord) {
        if (this.checkIfTheWordAlreadyGuessed(guessedWord)) {
            this.message = `<div class="invalid-guess">Invalid word!! You have already guessed "${guessedWord}"! Try a new word from the list!</div>`;
            return;
        }

        // Check if the guessed word is valid and If the word is not valid, set appropriate message
        if (isGuessedWordValid(guessedWord)) {
            ++this.numberOfValidGuesses;
            this.addGuessedWord(guessedWord.toLowerCase());
        } else {
            this.message = `<div class="invalid-message">Invalid word! ${guessedWord} is not in the acceptable word list. Try Again! Make sure to choose from acceptable word list</div>`;
            return;
        }

        // Check if the game is won
        this.isGameWon = isGuessedWordSameAsSecret(this.secretWord, guessedWord);
        if (this.isGameWon) {
            this.message = `<div class="congrats-message">Congratulations! You won! Hit RESTART to play again!</div>`;
        } else {
            this.message = "Try to guess the secret word!";
        }
    }

    // add a guessed word
    addGuessedWord(guessedWord) {
        const numberOfMatchingLetters = calculateMatchingLetters(
            this.secretWord,
            guessedWord
        );
        // Add to the beginning of the array
        this.guessedWords.unshift(new Guess(guessedWord, numberOfMatchingLetters));
    }

    // check if the word has already been guessed
    checkIfTheWordAlreadyGuessed(guessedWord) {
        const lowercasedGuessedWord = guessedWord.toLowerCase();
        return this.guessedWords.some((word) => {
            return word.guessedWord.toLowerCase() === lowercasedGuessedWord;
        });
    }
}

class Guess {
    constructor(guessedWord, numberOfMatchingLetters) {
        this.guessedWord = guessedWord;
        this.numberOfMatchingLetters = numberOfMatchingLetters;
    }
}

class User {
    constructor(username) {
        this.username = username;
        // Initialize a new game for the user
        this.game = new Game(getRandomSecretWord());
        console.log(
            `Secret word for user "${this.username}" is "${this.game.secretWord}"`
        );
    }

    //  create a new game for the user
    createNewGame() {
        this.game = new Game(getRandomSecretWord());
        console.log(
            `Secret word for user "${this.username}" is "${this.game.secretWord}"`
        );
    }
}

module.exports = { Game, Guess, User };