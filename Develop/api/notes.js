const app = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
const uniqid = require('uniqid');

// GET Route for notes page
app.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

app.post('/notes', (req, res) => {
    console.info(`${req.method} request received to add a note.`)

    const { title, text, uniqid} = req.body;

    if (req.body) {
        const addNote = {
            title,
            text,
            uniqid: uuid(),
        };

    readAndAppend(addNote, './db/db.json');
    res.json(`Note added successfully!`);
    } else {
    res.error(`Error in adding a note.`);
    }
});

app.delete('/notes', (req, res) => {
    console.info(`${req.method} request received to delete note.`)

    const { title, text, uniqid } = req.body;

    if (req.body) {
        const deleteNote = {
            title,
            text,
            uniqid: uuid(),
        };

    writeToFile(deleteNote, './db/db.json');
    res.json(`Note deleted successfully!`);
    } else {
    res.error(`Error in deleting a note.`)
    }
});

module.exports = app;