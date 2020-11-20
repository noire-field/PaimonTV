import { MOVIE_SETMOVIES, MOVIE_SETCATEGORIES, MOVIE_SETMYLIST, MOVIE_SETDETAIL, MOVIE_UPDATEEPISODEPROGRESS } from '../../constants/store';

const initState = {
    movies: {},
    myList: [],
    myListSortNumber: 0,
    categories: [],
    detail: null
};

export default function(state = initState, action) {
    switch(action.type) {
        case MOVIE_SETMOVIES:
            return { ...state, movies: action.movies };
        case MOVIE_SETCATEGORIES:
            return { ...state, categories: action.categories };
        case MOVIE_SETMYLIST:
            return { ...state, myList: action.myList.list, myListSortNumber: action.myList.totalSortNumber };
        case MOVIE_SETDETAIL: 
            return { ...state, detail: action.movie };
        case MOVIE_UPDATEEPISODEPROGRESS:
            const movieId = action.data.movieId;
            const episodeId = action.data.episodeId;
            const progress = action.data.progress;

            const movies = { ...state.movies };

            movies[movieId].videos[episodeId].progress = progress;

            const detail = movies[movieId];
            detail.id = movieId;

            return { ...state, movies, detail };
    }

    return state;
}