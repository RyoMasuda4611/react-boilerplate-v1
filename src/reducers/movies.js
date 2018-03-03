const moviesReducerDefaultState = [];

export default (state = moviesReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_MOVIES':
          return action.movies
        default:
          return state;
    }
}
