import React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';

import MovieCategory from './../components/MovieCategory';
import PaimonText from '../components/PaimonText';

import Movie from './../models/Movie';
import * as Colors from './../constants/colors';


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
]

function TempGetMovies(movies) {
    return movies.map((m) => new Movie(m.id, m.imageUrl));
}

const HomeScreen = (props) => {
    const recentMovies = TempGetMovies(listRecent);
    const myMovies = TempGetMovies(listMine);

    return (
        <View style={styles.container}>
            <View style={styles.sidebar}>
                <Image style={styles.sidebarLogo} source={require('./../assets/images/paimon_logo_circle.png')}/>
                <PaimonText type="header" style={styles.sidebarText}>TV</PaimonText>
            </View>
            <ScrollView style={styles.movieCategories}>
                <MovieCategory title="Danh sách tiếp tục xem" list={recentMovies}/>
                <MovieCategory title="Danh sách của tôi" list={myMovies}/>
                <MovieCategory title="Hiện đang thịnh hành" list={myMovies}/>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.PRIMARY,
        flex: 1,
        flexDirection: 'row'
    },
    sidebar: {
        width: '5%',
        backgroundColor: Colors.ACCENT,
        borderRightWidth: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    sidebarLogo: {
        resizeMode: 'stretch',
        height: 38,
        width: 38
    },
    sidebarText: {
        fontSize: 20
    },
    movieCategories: {
        paddingTop: 20
    },
});

export default HomeScreen;