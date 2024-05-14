const fs = require("fs");
const path = require("path");
const data = JSON.parse(fs.readFileSync("../db/db.json", "utf8"));

// Function to read data from the database file
const readData = () => {
    const dataFilePath = path.join(__dirname, "../db/db.json");
    return JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
};

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

// Function to write data to the database file
const writeData = (data) => {
    const dataFilePath = path.join(__dirname, "../db/db.json");
    fs.writeFileSync(dataFilePath, JSON.stringify(data));
};

module.exports = function (app) {
    let data = readData();

    app.get("/api/notes", (req, res) => {

        res.json(data);

    });

    app.get("/api/notes/:id", function(req, res) {

        let idFind = data.filter((s) => s.id === Number(req.params.id));
        const result = idFind.length > 0 ? idFind : null ;
        res.json(result);

    });

    app.post("/api/notes", function(req, res) {

        let newNote = req.body;
        let uniqueId = (data.length);
        newNote.id = Number(uniqueId) + getRandomInt(30);
        data.push(newNote);
        
        fs.writeFileSync("./db/db.json", JSON.stringify(data), function(err) {
            if (err) throw (err);        
        }); 

        res.json(data);    

    });



    app.delete("/api/notes/:id", function(req, res) {

        const noteId = req.params.id;
        console.log(`Deleting note with id ${noteId}`);
        let idFind = data.filter((s) => s.id != Number(noteId))
        fs.writeFileSync("./db/db.json", JSON.stringify(idFind));
        res.json(idFind);
    }); 

}




