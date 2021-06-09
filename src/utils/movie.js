export function MakeCategories(series, movies) {
    var list = [];
    for(const key in series) {
        let category = {
            title: series[key].title,
            movies: [],
            createdAt: series[key].createdAt
        }

        let objMovies = series[key].movies;
        for(const key2 in objMovies) {
            let thisMovie = movies[key2];

            let movieShow = {
                title: thisMovie.title,
                thumbnail: thisMovie.thumbnail,
                movieId: key2
            };

            category.movies.push(movieShow);
            category.movies.reverse();
        }

        list.push(category);
    }

    list.sort((a, b) => b.createdAt - a.createdAt);

    return list;
}


export function MakeMyList(list, movies) {
    var myList = [];

    for(const key in list) {
        let objMovies = movies[key];
        let sortNumber = list[key];

        let movieShow = {
            title: objMovies.title,
            thumbnail: objMovies.thumbnail,
            movieId: key,
            sortNumber: sortNumber
        };

        myList.push(movieShow);
    }

    return myList.sort((a, b) => {
        return b.sortNumber - a.sortNumber;
    })
}

export function EpisodeObjectToArray(objList) {
    var list = [];

    if(!objList || Object.keys(objList).length <= 0)
        return list;

    for(var key in objList) {
        list.push({
            id: key,
            ...objList[key]
        });
    }

    list.sort((a, b) => {
        return Number(a.id.substring(2)) - Number(b.id.substring(2));
    });

    return list;
}

export function PadTimeText(num, size = 2) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

export function DurationSecondToText(duration) {
    if(duration >= 3600) {
        var hour = PadTimeText(Math.floor(duration / 3600));
        var remainSecond = Math.floor(duration % 3600);
        var minute = PadTimeText(Math.floor(remainSecond / 60));
        remainSecond = PadTimeText(remainSecond % 60);

        var text = `${hour}:${minute}:${remainSecond}`;
    } else {
        var text = `${PadTimeText(Math.floor(duration / 60))}:${PadTimeText(Math.floor(duration % 60))}`;
    }

    return text;
}

export function FindMovieInMyList(movieId, list) {
    for(var i = 0; i < list.length; i++) {
        let movie = list[i];
        if(movie.movieId == movieId)
            return movie.sortNumber;
    }

    return -1;
}

export function SortMyList(myList) {
    return myList.sort((a, b) => {
        return b.sortNumber - a.sortNumber;
    })
}

export function ScanMovieEpisodes(episodes) {
    var episodeIndex = 0;

    for(var i = 0; i < episodes.length; i++) {
        let ep = episodes[i];
        let completedPercent = GetEpisodeCompletedRate(ep);

        if(completedPercent >= 92) continue;
        else {
            episodeIndex = i;
            break;
        }
    }

    return episodeIndex;
}

export function GetEpisodeCompletedRate(episode) {
    return Math.max(Math.min(Math.round(episode.progress / episode.duration * 100), 100), 0);
}