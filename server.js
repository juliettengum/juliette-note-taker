
// Dependencies
const express = require('express');
const fs = require("fs");


// Sets up the express app
const app = express();
const PORT = process.env.PORT || 3001

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


require("./routes/html-routes")(app);
require("./routes/api-routes")(app);

// Starts the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});