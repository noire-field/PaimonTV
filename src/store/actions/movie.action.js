import { MOVIE_SETMOVIES, MOVIE_SETCATEGORIES, MOVIE_SETMYLIST } from './../../constants/store';

export function movieSetMovies(movies) {
    return {
        type: MOVIE_SETMOVIES,
        movies
    };
}

export function movieSetCategories(categories) {
    return {
        type: MOVIE_SETCATEGORIES,
        categories
    };
}

export function movieSetMyList(myList, totalSortNumber) {
    return {
        type: MOVIE_SETMYLIST,
        myList: {
            list: myList,
            totalSortNumber
        }
    };
}