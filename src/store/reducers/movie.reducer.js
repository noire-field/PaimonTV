import { MOVIE_SETMOVIES, MOVIE_SETCATEGORIES, MOVIE_SETMYLIST } from '../../constants/store';

const initState = {
    movies: [],
    myList: [],
    myListSortNumber: 0,
    categories: []
};

export default function(state = initState, action) {
    switch(action.type) {
        case MOVIE_SETMOVIES:
            return { ...state, movies: action.movies };
        case MOVIE_SETCATEGORIES:
            return { ...state, categories: action.categories };
        case MOVIE_SETMYLIST:
            return { ...state, myList: action.myList.list, myListSortNumber: action.myList.totalSortNumber };
    }

    return state;
}