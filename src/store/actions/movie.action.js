import axios from './../../utils/axios';

import { MOVIE_SETMOVIES, MOVIE_SETCATEGORIES, MOVIE_SETMYLIST, MOVIE_SETDETAIL } from './../../constants/store';

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

export function movieSetDetail(movie) {
    return {
        type: MOVIE_SETDETAIL,
        movie
    }
}

// Get some fucking delay pls (Only for TV)
var allowChecking = true;
var handlerAllowChecking = null;

function SetTimeUncheck() {
    allowChecking = true;
    handlerAllowChecking = null;
}

export function movieCheckToMyList(movieId, action) {
    return (dispatch, getState) => {
        if(!allowChecking) return;

        allowChecking = false;

        if(handlerAllowChecking) clearTimeout(handlerAllowChecking);
        handlerAllowChecking = setTimeout(SetTimeUncheck, 250);

        // Main Logic
        const stateMovie = getState().movie;
        var movieList = stateMovie.movies;
        var myList = stateMovie.myList;
        var sortNumber = stateMovie.myListSortNumber;

        if(!movieList.hasOwnProperty(movieId))
            return;

        var movie = movieList[movieId];

        if(action == 1) { // Add
            var newMyList = [...myList]
            newMyList.push({
                title: movie.title,
                thumbnail: movie.thumbnail,
                movieId: movieId,
                sortNumber: ++sortNumber
            });

            dispatch(movieSetMyList(newMyList, sortNumber));

            axios.patch('/myList/list.json', {
                [movieId]: sortNumber
            }).then(({ data }) => {
                
            }).catch((error) => {
                Logger.Error(`[Redux.Action.Movie] Unable to add movie to list`, error);
                Alert.alert('Lỗi', 'Không thể thêm phim vào danh sách của tôi.', [ { text: 'Đã hiểu' }]);
            });

            axios.patch('/myList.json', {
                sortNumber: sortNumber
            }).then(({ data }) => {
                
            }).catch((error) => {
                Logger.Error(`[Redux.Action.Movie] Unable to update sort number for list`, error);
                Alert.alert('Lỗi', 'Không thể thêm phim vào danh sách của tôi #2.', [ { text: 'Đã hiểu' }]);
            });
        } else if(action == -1) { // Remove
            var newMyList = myList.filter((item) => {
                if(item.movieId == movieId)
                    return false;
                
                return true;
            });

            dispatch(movieSetMyList(newMyList, sortNumber));

            axios.patch('/myList/list.json', {
                [movieId]: null
            }).then(({ data }) => {
                
            }).catch((error) => {
                Logger.Error(`[Redux.Action.Movie] Unable to add movie to list`, error);
                Alert.alert('Lỗi', 'Không thể xóa phim khỏi danh sách của tôi.', [ { text: 'Đã hiểu' }]);
            });
        }
    };
}

