const express = require("express");
const router = express.Router();
const {
  validateUsername
} = require("./validation");
const {
  loginPage,
  homePage
} = require("./templates");
const {
    getSidIfUserExists,
    getUser,
    addNewUserSidMapping,
    addNewUser,
    sessions
  } = require("./sessions");
  const { v4: uuidv4 } = require("uuid");

// Route to handle root URL
router.get("/", (req, res) => {
  const sid = req.cookies.sid;
  let htmlToBeRendered;
  if (sid && sid in sessions) {
    const user = getUser(sid);
    htmlToBeRendered = homePage(user);
  } else {
    htmlToBeRendered = loginPage();
  }
  res.send(htmlToBeRendered);
});

// Route to start a new game
router.get("/new-game", (req, res) => {
  const sid = req.cookies.sid;
  const user = getUser(sid);
  user.createNewGame();
  res.redirect("/");
});

// Route to handle user login
router.post("/login", validateUsername, (req, res) => {
  const { username } = req.body;
  let sid = getSidIfUserExists(username);
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
router.post("/guess", (req, res) => {
  let { guessedWord } = req.body;
  guessedWord = guessedWord.trim();
  const sid = req.cookies.sid;
  const user = getUser(sid);
  if (!user || user === undefined) {
    let html = "<h1>Invalid User!! Please login Again</h1>" + loginPage();
    res.send(html);
  } else {
    user.game.guessWord(guessedWord);
    res.redirect("/");
  }
});

// Route to handle user logout
router.post("/logout", (req, res) => {
  res.clearCookie("sid");
  res.redirect("/");
});

module.exports = router;
