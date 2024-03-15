const express = require("express");
const app = express();
const {
  v4: uuidv4
} = require("uuid");
const cookieParser = require("cookie-parser");
const {
  validateUsername
} = require("./validation");
const {
  Game,
  Guess,
  User
} = require("./gamemodels");
const {
  loginPage,
  homePage
} = require("./templates");
const PORT = 3000;

// Middleware setup
app.use(express.urlencoded({
  extended: false
}));
app.use(express.static("./public"));
app.use(cookieParser());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// store active sessions and map usernames to session IDs
const sessions = {};
const userSidMap = {};

// retrieve session ID for a given username
const getSidIfUserExists = (username) => {
  if (username in userSidMap) {
    return userSidMap[username];
  }
  return null;
};

// retrieve user object based on session ID
const getUser = (sid) => {
  return sessions[sid];
};

// map a username to a session ID
const addNewUserSidMapping = (username, sid) => {
  userSidMap[username] = sid;
};

// create a new user session
const addNewUser = (sid, username) => {
  sessions[sid] = new User(username);
};

// Route to handle root URL
app.get("/", (req, res) => {
  const sid = req.cookies.sid;
  let htmlToBeRendered;
  // Check if a session ID exists and corresponds to an active session and render pages
  if (sid && sid in sessions) {
    const user = getUser(sid);
    htmlToBeRendered = homePage(user);
  } else {
    htmlToBeRendered = loginPage();
  }

  res.send(htmlToBeRendered);
});

// Route to start a new game
app.get("/new-game", (req, res) => {
  const sid = req.cookies.sid;
  const user = getUser(sid);
  user.createNewGame();
  res.redirect("/");
});

// Route to handle user login
app.post("/login", validateUsername, (req, res) => {
  const {
    username
  } = req.body;
  let sid = getSidIfUserExists(username);
  // If the user does not have an existing session ID, create a new one
  if (!sid) {
    sid = uuidv4();
    addNewUser(sid, username);
    addNewUserSidMapping(username, sid);
  }
  res.cookie("sid", sid, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  });
  res.redirect("/");
});

// Route to handle user guesses
app.post("/guess", (req, res) => {
  let { guessedWord } = req.body;
  guessedWord = guessedWord.trim();
  const sid = req.cookies.sid;
  const user = getUser(sid);
  // Check if the user exists
  if (!user || user === undefined) {
    let html = "<h1>Invalid User!! Please login Again</h1>" + loginPage();
    res.send(html);
  } else {
    // Process user's guess
    user.game.guessWord(guessedWord);
    res.redirect("/");
  }
});

// Route to handle user logout
app.post("/logout", (req, res) => {
  res.clearCookie("sid");
  res.redirect("/");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});