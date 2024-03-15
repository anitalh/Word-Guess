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
            <h3 class="title">Acceptable Words List: You can click on the word to guess</h3>
              <div class="word-list">
                ${filteredWords.map((word) => `<p class="word">${word}</p>`).join("")}
              </div>
              <p>Instruction : 
              <br>
              1.The secret word is randomly selected from a list of acceptable words. Begin your attempt to guess the word!
              <br>
              2.A guess is deemed invalid if the word guessed is not included in the list of acceptable words.
              <br>
              3.Your score is determined by the number of correct guesses you make.
              <br>
              4."If you win the game, simply click on the 'RESTART' button to begin a new round.
              <br> 
              </p>
            </div>
            <div class="game-panel-container">
              <p class="turns">
                Number Of Valid Guesses: ${user.game.numberOfValidGuesses}
                <br><br>
                <span className="score">
                ${
                  user.game.guessedWords.length > 0
                    ? ` 
                Your Previous Valid Guess: ${user.game.guessedWords[0].guessedWord} matched ${user.game.guessedWords[0].numberOfMatchingLetters} letters with secret word`
                    : ""
                }
                </span>
              </p>
              <div class="control-panel">
                <div class="word-input">
                  <form action="/guess" method="POST"> 
                    <input id="guess-field" name="guessedWord" placeholder="Type your guess" required ${
                      user.game.isGameWon ? "disabled" : "enabled"
                    }> 
                    <button class="guess-button" type="submit" ${
                      user.game.isGameWon ? "disabled" : "enabled"
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
                <h3>Your valid Guesses & Letter Match History</h3>
                <div class="history-panel">
                    ${user.game.guessedWords
                      .map(
                        (guess) =>
                          `<div><span class="word">You guessed "${guess.guessedWord}"</span> : <span class="word">matched ${guess.numberOfMatchingLetters} letters with secret word</span></div>`
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