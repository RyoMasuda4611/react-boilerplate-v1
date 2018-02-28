const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27018/SelectMovies', (err, client) => {
  if (err) {
      return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('SelectMovies');
  

    client.close();

});