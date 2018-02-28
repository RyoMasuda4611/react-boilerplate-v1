const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27018/SelectMovies', (err, client) => {
  if (err) {
      return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('SelectMovies');
  try {
    ( async () => {
      const movies = await db.collection('Movies').find().toArray();
      console.log(JSON.stringify(movies, undefined, 2)); 
    })();
  } catch(e) {
    console.log(e);
  }
    client.close();

});