const app = require('express').Router();
const { readFromFile, readAndAppend } = require('./helpers/fsutils');
const uuid = require('../helpers/uuid');

// GET Route for notes page
app.get('/api/notes', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note.`)

    const { title, text} = req.body;

    if (req.body) {
        const addNote = {
            title,
            text,
            note_id: uuid(),
        };

    readAndAppend(addNote, './db/db.json');
    res.json(`Note added successfully!`);
    } else {
    res.error(`Error in adding a note. Please try again`);
    }
});

app.delete('', (req, res) => {
    console.info(`${req.method} request received to delete note.`)
})

module.exports = app;