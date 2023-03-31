const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const {v4: uuidv4} = require('uuid');


notes.get('/', (req,res) => {
    readFromFile('./db/db.json').then((data) => {
        if (data && data.length > 0) {
            res.json(JSON.parse(data))
        }
        else {
            res.json([]);
        }
    });
});

notes.delete('/:id', (req,res) => {
    const noteId = req.params.id;

    readFromFile('./db/db.json').then((data) => JSON.parse(data)).then((json) => {
        const result = json.filter((note) => note.id !== noteId);
        
    writeToFile('./db/db.json', result);

    res.json(`Note with ID ${noteId} deleted from database`);
    })
    .catch((err) => {
        console.log(err);
    })

});

notes.post('/', (req,res) => {

    const {title, text} = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note with ID ${newNote.id} added to Database`);
    }
    else{
        res.json('Error in adding note')
    }
});

module.exports = notes;