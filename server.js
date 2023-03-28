const express = require('express');
const path = require('path');
const api = require('./routes/index'); 

const PORT = process.env.PORT || 3001;

const app = express();
// parse incoming JSON payloads & incoming URL-encoded payloads
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
// serve static files from the 'public' directory
app.use(express.static('public')); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html')); 
});
// start listening for incoming requests
app.listen(PORT, () => { 
    console.log(`App listening on port http://localhost:${PORT}`);
});