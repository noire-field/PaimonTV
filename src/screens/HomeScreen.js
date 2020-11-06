import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import MovieCategory from './../components/MovieCategory';

import * as Colors from './../constants/colors';
import PaimonText from '../components/PaimonText';

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

const HomeScreen = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.headerImage} source={require('./../assets/images/paimon_logo_circle.png')}/>
                <PaimonText type="header2" style={styles.textPaimonTV}>Paimon TV</PaimonText>
            </View>
            <MovieCategory title="Danh sách tiếp tục xem" list={listRecent}/>
            <MovieCategory title="Danh sách của tôi" list={listMine}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.PRIMARY,
        flex: 1,
        paddingTop: 20,
        paddingLeft: 20
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 10
    },
    headerImage: {
        resizeMode: 'stretch',
        height: 24,
        width: 24,
        marginRight: 5
    },
    textPaimonTV: {
        color: Colors.ACCENT,
        fontSize: 18,
    }
});

export default HomeScreen;