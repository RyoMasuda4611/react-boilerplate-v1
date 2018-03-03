import { MongoClient, ObjectID } from 'mongodb';
import {Movie} from '../../server/models/movie';

export const setMovies = (movies) => ({
  type: 'SET_MOVIES',
  movies
});

export const startSetMovies = () => {
    return (dispatch) => {
      return Movie.find({}, (err, movies) => {
        if (err) return handleError(err);
        dispatch(setMovies(movies));
      });
    }
}