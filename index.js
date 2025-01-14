require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const short_url = require('./routes/urlRoute');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


// urlRoute
app.use('/api/shorturl', short_url);


// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.use('/api/shorturl', short_url);

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
