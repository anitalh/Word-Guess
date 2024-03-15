const { getRandomSecretWord, isGuessedWordValid, calculateMatchingLetters, isGuessedWordSameAsSecret } = require('./gamehelpers');

class Game {
    secretWord = getRandomSecretWord();
    numberOfValidGuesses = 0;
    guessedWords = [];
    isGameWon = false;
    message = this.getRandomMessage("initial");

    // Helper method to get a random message
    getRandomMessage(type) {
        const messages = {
            initial: [
                "Start guessing the secret word!"
            ],
            invalidGuess: [
                "Oops, try a different word!",
            ],
            invalidWord: [
                "This word isn't on the list. Try again!",
            ],
            congrats: [
                "You've cracked it! Well done! Start a new game to play again!",
            ]
        };

        // Select a random message based on the type
        const messageList = messages[type];
        return messageList[Math.floor(Math.random() * messageList.length)];
    }

    guessWord(guessedWord) {
        const lowercasedGuessedWord = guessedWord.toLowerCase();
        
        if (this.guessedWords.some(word => word.guessedWord === lowercasedGuessedWord)) {
            this.message = `<div class="invalid-guess">${this.getRandomMessage("invalidGuess")} "${guessedWord}".</div>`;
            return;
        }

        if (isGuessedWordValid(guessedWord)) {
            this.numberOfValidGuesses++;
            const numberOfMatchingLetters = calculateMatchingLetters(this.secretWord, guessedWord);
            this.guessedWords.unshift({ guessedWord: lowercasedGuessedWord, numberOfMatchingLetters });

            this.isGameWon = isGuessedWordSameAsSecret(this.secretWord, guessedWord);
            this.message = this.isGameWon ?
                `<div class="congrats-message">${this.getRandomMessage("congrats")}</div>` :
                this.getRandomMessage("initial");
        } else {
            this.message = `<div class="invalid-message">${this.getRandomMessage("invalidWord")} - "${guessedWord}".</div>`;
        }
    }
}

class User {
    username;
    game;

    constructor(username) {
        this.username = username;
        this.game = new Game();
        console.debug(`New game for "${this.username}": secret word is "${this.game.secretWord}"`);
    }

    createNewGame() {
        this.game = new Game();
        console.debug(`New game for "${this.username}": secret word is "${this.game.secretWord}"`);
    }
}

module.exports = { Game, User };
