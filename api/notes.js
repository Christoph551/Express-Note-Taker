const app = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
const fs = require('fs');
const uuid = require('../helpers/uuid');

// GET Route for notes page
app.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

app.post('/notes', (req, res) => {
    console.info(`${req.method} request received to add a note.`)

    const { title, text } = req.body;

    if (req.body) {
        const addNote = {
            title,
            text,
            id: uuid(),
        };

    readAndAppend(addNote, './db/db.json');
    res.json(`Note added successfully!`);
    } else {
    res.error(`Error in adding a note.`);
    }
});

app.delete('/api/notes/:id', (req, res) => {
    console.info(`${req.method} request received to delete note.`)
    console.log(req.body, req.params)
    const deleteArray = JSON.parse(res)
    const readAndUpdateData = fs.readFileSync('./notes', 'utf8');
    const parsedData = JSON.parse(readAndUpdateData);
    parsedData.push(deleteArray)
});

module.exports = app;