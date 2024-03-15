const words = require("./words.js");

// render login page HTML
const loginPage = () => {
  return `
    <!doctype html>
    <html>
      <head>
        <link rel="stylesheet" href="/style.css">
        <title>Login Word Guessing Game</title>
      </head>
      <body>
        <div class="login-container">
          <div id="content" class="content-container">
            <form action="/login" method="POST"> 
                <h1>Word Guessing Game</h1>    
              <div class="text-input" id="login_username">
                <input name="username" placeholder="Enter your username" required> 
                <div class="space">
                  <button class="login-button" type="submit">LOGIN</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </body>
    </html>
    `;
};

// render home page HTML
// render home page HTML
const homePage = (user) => {
  const filteredWords = words.filter(word => !user.game.guessedWords.some(guess => guess.guessedWord === word));
  return `
    <!doctype html>
    <html>
      <head>
        <link rel="stylesheet" href="/style.css">
        <title>Word Guessing Game</title>
      </head>
      <body>
        <div id="word-guessing-game">
          <div class="page-title">
            <h2>Word Guessing Game, Welcome ${user.username} </h2>
            <div class="logout"> 
              <form action="/logout" method="POST"> 
                <button class="logout-button" type="submit">LOGOUT</button>
              </form>
            </div>
          </div>
          <div class="game-panel">
            <div class="word-list-panel">
              <h3 class="title">List of Words for Guessing: Click a word to make a guess</h3>
              <div class="word-list">
                ${filteredWords.map((word) => `<p class="word">${word}</p>`).join("")}
              </div>
              <p>Guidelines: 
              <br>
              1. A random word is chosen as the secret. Start guessing to find it!
              <br>
              2. Invalid guesses are those not found in our list of words.
              <br>
              3. Your score reflects the accurate guesses made.
              <br>
              4. Win the game and press 'RESTART' for another round.
              <br>
              </p>
            </div>
            <div class="game-panel-container">
              <p class="turns">
                Total Correct Guesses: ${user.game.numberOfValidGuesses}
                <br><br>
                <span className="score">
                ${
                  user.game.guessedWords.length > 0
                    ? ` 
                Latest Correct Guess: ${user.game.guessedWords[0].guessedWord} with ${user.game.guessedWords[0].numberOfMatchingLetters} matching letters`
                    : ""
                }
                </span>
              </p>
              <div class="control-panel">
                <div class="word-input">
                  <form action="/guess" method="POST"> 
                    <input id="guess-field" name="guessedWord" placeholder="Enter your guess" required ${
                      user.game.isGameWon ? "disabled" : ""
                    }> 
                    <button class="guess-button" type="submit" ${
                      user.game.isGameWon ? "disabled" : ""
                    }>GUESS</button>
                  </form>
                  <div class="message-panel">
                  ${user.game.message}
                  </div> 
                  <div class="controls">
                    <div class="restart"> 
                      <form action="/new-game" method="GET"> 
                        <button class="restart-button" type="submit">RESTART</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div class="accepted-guess-panel">
                <h3>Your Successful Guesses & Matching Letters</h3>
                <div class="history-panel">
                    ${user.game.guessedWords
                      .map(
                        (guess) =>
                          `<div><span class="word">Guessed "${guess.guessedWord}"</span> : <span class="word">with ${guess.numberOfMatchingLetters} matching letters</span></div>`
                      ).join("")}
                </div>
              </div>
            </div>
          </div> 
        </div>
        <script>
          let words = document.querySelectorAll(".word");
          let guessField = document.querySelector("#guess-field");
          words.forEach(word => {
            word.addEventListener("click", (e) => {
              guessField.value = e.target.innerText;
            });
          });
        </script>
      </body>
    </html>
    `;
};


// render HTML for invalid username
const invalidUserNameHtml = (errorMessage) => {
  return `
      <link rel="stylesheet" href="/style.css" />
      <h2>${errorMessage}</h2>
      <h3>Please Login Again..!!</h3>
      <form method="GET" action="/">
      <button class="login-button" type="submit">Login</button>
      </form>
    `;
};

module.exports = { loginPage, invalidUserNameHtml, homePage };