import React from 'react';
import { View, StyleSheet } from 'react-native';

import PaimonText from './../components/PaimonText';
import MovieList from './../components/MovieList';

const MovieCategory = (props) => {
    return (
        <View style={styles.container}>
            <PaimonText type="header" style={styles.headerText}>{props.title}</PaimonText>
            <MovieList list={props.list}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    headerText: {
        marginBottom: 5
    }
})

export default MovieCategory;