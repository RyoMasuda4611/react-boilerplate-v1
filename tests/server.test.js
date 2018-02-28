const { app, server } = require('../server/server');
const { Movie } = require('../server/models/movie');
const { ObjectId } = require('mongodb');
const request = require('supertest');

const movies = [
  {
    _id: new ObjectId(),
    url: "this is youtube"
  },
  {
    _id: new ObjectId(),
    url: "this is youtube 2"
  }
]

beforeEach( async (done) => {
    await Movie.remove({})
    await Movie.insertMany(movies);
    server.close();
    done();
})

describe('POST/ movies', () => {
  test('should create new movie', async (done) => {
   var url = 'this is youtube';
   const response = await request(app).post('/movies').send({url})
   expect(response.statusCode).toBe(200);
   expect(response.body.url).toBe(url);
   try {
       var movie = await Movie.find();
       expect(movie.length).toBe(3);
       expect(movie[0].url).toBe(url);
       done();
   } catch(e) {
     done(e);
   }
  });

  test('should not crete new movie with invalid properties', async (done) => {
    const response = await request(app).post('/movies').send({})
    expect(response.statusCode).toBe(400);
    try {
      var movies = await Movie.find();
      expect(movies.length).toBe(2);
      done();
    } catch(e) {
      done(e);
    }
  });

  test('should fetch all movies', async (done) => {
    try {
      const response = await request(app).get('/movies')
      expect(response.body.movies.length).toBe(2);
      done();
    } catch(e) {
      done(e);
    }
  });
});

describe('GET /movies/:id', () => {
  test('should fetch movie', async (done) => {
    try {
      const response = await request(app).get(`/movies/${movies[0]._id.toHexString()}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.movie.url).toBe(movies[0].url);
      done();
    } catch(e) {
      done(e);
    }
  });

  test('should return 404 if movie is not found', async (done) => {
    var id = new ObjectId().toHexString();
    try {
      const response = await request(app).get(`/movies/${id}`);
      expect(response.statusCode).toBe(404);
      done();
    } catch(e) {
      done(e);
    }
  });

  test('should return 404 for non object id', async (done) => {
    var id = 123;
    try {
      const response = await request(app).get(`/movies/${id}`);
      expect(response.statusCode).toBe(404);
      done();
    } catch(e) {
      done(e);
    }
  });

});
