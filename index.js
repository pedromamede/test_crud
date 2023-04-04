// server.js
const express = require('express');
const apiRouter = require('./api');
const path = require('path');

const app = express();
const port = process.env.PORT || 80;

// Serve your static files from the public directory
app.use(express.static('public'));

// Mount your API endpoints on the /api route
app.use('/api', apiRouter);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Start your server and listen for incoming requests
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});