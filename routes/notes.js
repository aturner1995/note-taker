const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const {v4: uuidv4} = require('uuid');


notes.get('/', (req,res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => {
        if (data && data.length > 0) {
            res.json(JSON.parse(data))
        }
        else {
            res.json([]);
        }
    });
});

notes.get('/:id', (req,res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => {
        res.json(JSON.parse(data))});
});

notes.post('/', (req,res) => {
    console.info(`${req.method} request received for notes`)

    const {title, text} = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            tip_id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json('Tip added to Database');
    }
    else{
        res.json('Error in adding note')
    }
});

module.exports = notes;