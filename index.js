// server.js
const express = require('express');
const apiRouter = require('./api');

const app = express();
const port = process.env.PORT || 80;

// Serve your static files from the public directory
app.use(express.static('public'));

// Mount your API endpoints on the /api route
app.use('/api', apiRouter);

app.set('view engine', 'ejs');

// Start your server and listen for incoming requests
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});