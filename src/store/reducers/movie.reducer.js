import { MOVIE_SETMOVIES, MOVIE_SETCATEGORIES, MOVIE_SETMYLIST, MOVIE_SETDETAIL } from '../../constants/store';

const initState = {
    movies: [],
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
            return state;
    }

    return state;
}