const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid"); 
const cookieParser = require("cookie-parser");
const routes = require("./routes"); 

// Middleware setup
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./public"));
app.use(cookieParser());
app.use(routes);

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

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
