// Dependencies
const express = require("express");
const path = require("path");

// Sets up the express app
const app = express();
const PORT = process.env.PORT || 3001
// Sets up the express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware to set the correct MIME type for CSS files
app.use((req, res, next) => {
    if (req.path.endsWith('.css')) {
      res.header('Content-Type', 'text/css');
    }
    next();
  });

// Middleware to set the correct MIME type for JS files
app.use((req, res, next) => {
    if (req.path.endsWith('.js')) {
      res.header('Content-Type', 'application/javascript');
    }
    next();
  });
  

  app.use("/assets", express.static(path.join(__dirname, "public", "assets")));
  

//Routes
require("./routes/html-routes")(app);
require("./routes/api-routes")(app);

// Starts the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});