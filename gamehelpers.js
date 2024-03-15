const words = require("./words.js");

// Return a random word
const getRandomSecretWord = () => {
    return words[Math.floor(Math.random() * words.length)];
};

// Check if a guessed word is a valid word from the list case-insensitive
const isGuessedWordValid = (guessedWord) => {
    const lowercasedGuessedWord = guessedWord.toLowerCase();
    return words.some(word => word.toLowerCase() === lowercasedGuessedWord);
};

// Check if a guessed word matches the secret word case-insensitive
const isGuessedWordSameAsSecret = (secretWord, guessedWord) => {
    return secretWord.toLowerCase() === guessedWord.toLowerCase();
};

// Calculate the number of matching letters between secret word and guessed word
const calculateMatchingLetters = (secretWord, guessedWord) => {
    const secretWordSet = new Set(secretWord.toLowerCase());
    const guessedWordSet = new Set(guessedWord.toLowerCase());
    let count = 0;
    for (let letter of guessedWordSet) {
        if (secretWordSet.has(letter)) {
            count += Math.min(
                secretWord.split('').filter(l => l.toLowerCase() === letter).length,
                guessedWord.split('').filter(l => l.toLowerCase() === letter).length
            );
        }
    }
    return count;
};

module.exports = { getRandomSecretWord, isGuessedWordValid, calculateMatchingLetters, isGuessedWordSameAsSecret };
