const path = require ('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
const { mongoose } = require('./db/mongoose');
const { Movie } = require('./models/movie');

app.use(express.static(publicPath));
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

app.get('/movies', async (req, res) => {
  try {
    var movies = await Movie.find();
    res.send({movies});
  } catch(e) {
    res.send(e);
  }
});

app.get('/movies/:id', async (req, res) => {
  var id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  } else {
    try {
      var movie = await Movie.findById(id);
      if(movie) {
        return res.send({movie});
      }
      res.status(404).send();
    } catch(e) {
      res.status(400).send(e);
  }
}
});

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

var server = app.listen(port, () => {
  console.log('Server is up');
});

module.exports = { server, app };
