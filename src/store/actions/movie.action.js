import axios from './../../utils/axios';

import { MOVIE_SETMOVIES, MOVIE_SETCATEGORIES, MOVIE_SETMYLIST, MOVIE_SETDETAIL, MOVIE_UPDATEEPISODEPROGRESS } from './../../constants/store';

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

export function movieSetMyList(myList) {
    return {
        type: MOVIE_SETMYLIST,
        myList: {
            list: myList
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

        if(!movieList.hasOwnProperty(movieId))
            return;

        var movie = movieList[movieId];

        if(action == 1) { // Add
            var newMyList = [...myList]
            newMyList.unshift({
                title: movie.title,
                subTitle: movie.subTitle,
                thumbnail: movie.thumbnail,
                movieId: movieId,
            });

            dispatch(movieSetMyList(newMyList));

            axios.patch('/myList.json', {
                [movieId]: new Date().getTime()
            }).then(({ data }) => {
                
            }).catch((error) => {
                Logger.Error(`[Redux.Action.Movie] Unable to add movie to list`, error);
                Alert.alert('Lỗi', 'Không thể thêm phim vào danh sách của tôi.', [ { text: 'Đã hiểu' }]);
            });
        } else if(action == -1) { // Remove
            var newMyList = myList.filter((item) => {
                if(item.movieId == movieId)
                    return false;
                
                return true;
            });

            dispatch(movieSetMyList(newMyList));

            axios.patch('/myList.json', {
                [movieId]: null
            }).then(({ data }) => {
                
            }).catch((error) => {
                Logger.Error(`[Redux.Action.Movie] Unable to add movie to list`, error);
                Alert.alert('Lỗi', 'Không thể xóa phim khỏi danh sách của tôi.', [ { text: 'Đã hiểu' }]);
            });
        }
    };
}

export function movieUpdateEpisodeProgress(progress) {
    return (dispatch, getState) => {

        const state = getState();

        if(!state.watch.episode) return;
        
        var movieId = state.movie.detail.id;
        var episodeId = state.watch.episode.id;
        var currentProgress = Math.round(state.watch.currentProgress);

        if(currentProgress <= 0) return;

        axios.patch(`/movies/${movieId}/episodes/${episodeId}.json`, {
            progress: currentProgress
        }).then(({ data }) => {
            
        }).catch((error) => {
            Logger.Error(`[Redux.Action.Movie] Unable to update episode progress to firebase`, error);
            //Alert.alert('Lỗi', 'Không thể xóa phim khỏi danh sách của tôi.', [ { text: 'Đã hiểu' }]);
        });

        dispatch({
            type: MOVIE_UPDATEEPISODEPROGRESS,
            data: {
                movieId,
                episodeId,
                progress: currentProgress
            }
        })
    };
}