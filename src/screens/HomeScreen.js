import React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, ScrollView } from 'react-native';


import MovieCategory from './../components/MovieCategory';
import Sidebar from './../components/Sidebar';
import * as Colors from './../constants/colors';

const HomeScreen = (props) => {
    const categories = useSelector(state => state.movie.categories);
    const myList = useSelector(state => state.movie.myList);

    const renderMyList = <MovieCategory key={`-1-mylist`} title='Danh sách của tôi' list={myList}/>
    const renderCategories = categories.map((cat, index) => <MovieCategory key={`${index}-${cat.title}`} title={cat.title} list={cat.movies}/>);

    return (
        <View style={styles.container}>
            <Sidebar style={styles.sidebar}/>
            <ScrollView style={styles.movieCategories}>
                {renderMyList}
                {renderCategories}
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
        width: '5%'
    },
    movieCategories: {
        paddingTop: 20
    },
});

export default HomeScreen;