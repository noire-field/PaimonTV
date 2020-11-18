import { MOVIE_SETMOVIES, MOVIE_SETCATEGORIES, MOVIE_SETMYLIST, MOVIE_SETDETAIL, MOVIE_SETWATCHEPISODE } from '../../constants/store';

const initState = {
    movies: [],
    myList: [],
    myListSortNumber: 0,
    categories: [],
    detail: null,
    watch: {
        episode: null,
        startAt: 0
    }
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
        case MOVIE_SETWATCHEPISODE: 
            var watch = { ...state.watch, episode: action.data.episode, startAt: action.data.startAt };
            return { ...state, watch };
    }

    return state;
}