import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import * as Colors from './../constants/colors';

const MovieItem = (props) => {
    console.log(props);
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: props.image }}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginRight: 10,
        height: 200,
        width: 135,
        elevation: 1,
        borderBottomColor: Colors.ACCENT,
        borderBottomWidth: 2
    },
    image: {
        resizeMode: 'stretch',
        height: '100%',
        width: '100%'
    }
})

export default MovieItem;