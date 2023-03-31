const express = require('express');
// Import Modules
const notesRouter = require('./notes');
// Create app to store the value of express
const app = express();
// Use our routes
app.use('/notes', notesRouter);
// Export app
module.exports = app;