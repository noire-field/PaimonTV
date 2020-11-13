
/*
const listRecent = [
    { id: 0, imageUrl: "https://images-na.ssl-images-amazon.com/images/I/615RWFNlXDL._AC_SY741_.jpg" },
    { id: 1, imageUrl: "https://i.pinimg.com/originals/dd/c4/1a/ddc41ad6bb9725d050cbcd08984c5fa1.jpg" },
    { id: 2, imageUrl: "https://images-na.ssl-images-amazon.com/images/I/61jphewUR6L._AC_SL1111_.jpg" },
    { id: 3, imageUrl: "https://images-na.ssl-images-amazon.com/images/I/81ajhj8RqML._AC_SL1440_.jpg" }
];

const listMine = [
    { id: 6, imageUrl: "https://images-na.ssl-images-amazon.com/images/I/71rZtELyYzL._AC_SY679_.jpg" },
    { id: 5, imageUrl: "https://images-na.ssl-images-amazon.com/images/I/71h2oO534hL._AC_SL1000_.jpg" },
    { id: 4, imageUrl: "https://www.arthipo.com/image/cache/catalog/poster/movie/1-758/pfilm252-star-wars-episode-v-the-empire-strikes-back-yildiz-savaslari-poster-movie-film-1000x1000.jpg" },
    { id: 3, imageUrl: "https://images-na.ssl-images-amazon.com/images/I/A1wnJQFI82L._AC_SY879_.jpg" },
    { id: 2, imageUrl: "https://images-na.ssl-images-amazon.com/images/I/71MKj4j-isL._AC_SY879_.jpg" },
    { id: 1, imageUrl: "https://images-na.ssl-images-amazon.com/images/I/61KEdyRT5eL._AC_SL1050_.jpg" },
    { id: 0, imageUrl: "https://ae01.alicdn.com/kf/HTB1h5pCNXXXXXXiaXXXq6xXFXXX9.jpg" }
]*/


export function MakeCategories(series, movies) {
    var list = [];
    for(const key in series) {
        let category = {
            title: series[key].title,
            movies: []
        }

        let objMovies = series[key].movies;
        for(const key2 in objMovies) {
            let thisMovie = movies[objMovies[key2]];

            let movieShow = {
                title: thisMovie.title,
                thumbnail: thisMovie.thumbnail,
                movieId: objMovies[key2]
            };

            category.movies.push(movieShow);
        }

        list.push(category);
    }

    return list;
}


export function MakeMyList(list, movies) {
    var myList = [];

    for(const key in list.list) {
        let objMovies = movies[key];
        let sortNumber = list.list[key];

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

    for(var key in objList) {
        list.push({
            id: key,
            ...objList[key]
        });
    }

    return list;
}