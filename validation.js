const {
    invalidUserNameHtml
} = require("./templates");


//  validate the username
const validateUsername = (req, res, next) => {
    // regex for letters and numbers
    const regex = /^[a-zA-Z0-9]+$/;
    const {
        username
    } = req.body;

  // Check if the username is empty or contains special characters
  if (!username || username.length < 1 || !regex.test(username)) {
    return res.status(400).send(invalidUserNameHtml("Invalid username. Please enter a valid username."));  
  }
  // Check if the username is "dog" 
  else if (username.toLowerCase() === "dog") {
    return res.status(403).send(invalidUserNameHtml("Access Denied: Dog is not allowed as a username."));
  }
    // Proceed if the username is valid
    else {
        next();
    }
};

module.exports = {
    validateUsername
};