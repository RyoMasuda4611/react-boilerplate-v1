const { app, server } = require('../server/server');
const { Movie } = require('../server/models/movie');
const request = require('supertest');

beforeEach((done) => {
    Movie.remove({}).then(() => {
        server.close();
        done();
    });
})

describe('POST/ movies', () => {
  test('should create new movie', async (done) => {
   var url = 'this is youtube';
   const response = await request(app).post('/movies').send({url})
   expect(response.statusCode).toBe(200);
   expect(response.body.url).toBe(url);
   try {
       var movie = await Movie.find();
       expect(movie.length).toBe(1);
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
      expect(movies.length).toBe(0);
      done();
    } catch(e) {
      done(e);
    }
  });
});
