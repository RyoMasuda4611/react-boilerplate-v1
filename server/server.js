const path = require ('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
const { mongoose } = require('./db/mongoose');
const { Movie } = require('./models/movie');

// app.use(express.static(publicPath));
app.use(bodyParser.json());

app.post('/movies', async (req, res) => {
  var movie = new Movie({
    url: req.body.url
  });
  try {
    var docs = await movie.save();
    res.send(docs);
  } catch(e) {
    res.status(400).send(e);
  }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log('Server is up');
});
