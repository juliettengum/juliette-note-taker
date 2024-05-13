const fs = require("fs");
const path = require("path");

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

    app.get("/api/notes/:id", (req, res) => {
        const data = readData();
        const noteId = req.params.id;
        const note = data.find((note) => note.id === noteId);
        if (note) {
            res.json(note);
        } else {
            res.status(404).json({ message: "Note not found" });
        }
    });

    app.post("/api/notes", (req, res) => {
        const newNote = req.body;
        const data = readData();
        newNote.id = (data.length + 1).toString(); // Assign a unique ID
        data.push(newNote);
        writeData(data);
        res.json(newNote);
    });

    app.delete("/api/notes/:id", (req, res) => {
        const noteId = req.params.id;
        let data = readData();
        data = data.filter((note) => note.id !== noteId);
        writeData(data);
        res.json(data);
    });
};

