const fs = require("fs");
const path = require("path");
const data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

// Function to read data from the database file
const readData = () => {
    const dataFilePath = path.join(__dirname, "./db/db.json");
    return JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
};

// Function to write data to the database file
const writeData = (data) => {
    const dataFilePath = path.join(__dirname, "./db/db.json");
    fs.writeFileSync(dataFilePath, JSON.stringify(data));
};

module.exports = function (app) {
    app.get("/api/notes", (req, res) => {
        const data = readData();
        res.json(data);
    });

    app.get("/api/notes/:id", function(req, res) {

        res.json(data[Number(req.params.id)]);

    });


    app.post("/api/notes", function(req, res) {

        let newNote = req.body;
        let uniqueId = (data.length).toString();
        console.log(uniqueId);
        newNote.id = uniqueId;
        data.push(newNote);
        
        fs.writeFileSync("./db/db.json", JSON.stringify(data), function(err) {
            if (err) throw (err);        
        }); 

        res.json(data);    

    });



    app.delete("/api/notes/:id", function(req, res) {

        const noteId = req.params.id;
        const newId = 0;
        console.log(`Deleting note with id ${noteId}`);
        data = data.filter(currentNote => {
           return currentNote.id != noteId;
        });
        for (currentNote of data) {
            currentNote.id = newId.toString();
            newId++;
        }
        fs.writeFileSync("./db/db.json", JSON.stringify(data));
        res.json(data);
    }); 

}




