const { User } = require("./gamemodels");

// Store active sessions and map usernames to session IDs
const sessions = {};
const userSidMap = {};

// Retrieve session ID for a given username
const getSidIfUserExists = (username) => {
  return userSidMap[username] || null;
};

// Retrieve user object based on session ID
const getUser = (sid) => {
  return sessions[sid] || null;
};

// Map a username to a session ID
const addNewUserSidMapping = (username, sid) => {
  userSidMap[username] = sid;
};

// Create a new user session
const addNewUser = (sid, username) => {
  sessions[sid] = new User(username);
};

module.exports = {
  getSidIfUserExists,
  getUser,
  addNewUserSidMapping,
  addNewUser,
  sessions
};
