// Read from words.js
const words = require("./words.js");

// return a random word
const getRandomSecretWord = () => {
    return words[Math.floor(Math.random() * words.length)];
};

// check if a guessed word is a valid word from the list case-insensitive
const isGuessedWordValid = (guessedWord) => {
    const lowercasedGuessedWord = guessedWord.toLowerCase();
    return words.some(word => word.toLowerCase() === lowercasedGuessedWord);
};

// check if a guessed word matches the secret word case-insensitive
const isGuessedWordSameAsSecret = (secretWord, guessedWord) => {
    return secretWord.toLowerCase() === guessedWord.toLowerCase();
};

// calculate the number of matching letters between secret word and guessed word
const calculateMatchingLetters = (secretWord, guessedWord) => {
    let count = 0;
    let secretWordInLowerCase = secretWord.toLowerCase();
    let guessedWordInLowerCase = guessedWord.toLowerCase();
    for (let index in secretWordInLowerCase) {
        let currentLetter = secretWordInLowerCase[index];
        if (guessedWordInLowerCase.includes(currentLetter)) {
            count++;
            guessedWordInLowerCase = guessedWordInLowerCase.replace(
                currentLetter,
                ""
            );
        }
    }
    return count;
};

module.exports = { getRandomSecretWord, isGuessedWordValid, calculateMatchingLetters, isGuessedWordSameAsSecret, };