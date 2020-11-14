import React from 'react'
import { View, StyleSheet } from 'react-native';

import PaimonText from './PaimonText';
import * as Colors from './../constants/colors';

import { DurationSecondToText } from './../utils/movie';

const EpisodeItem = (props) => {
    var remainDuration = DurationSecondToText(props.duration - props.progress);
    var durationProgress = Math.round((props.progress / props.duration) * 100);

    return (
        <View style={styles.container}>
            <View style={[styles.wrapper, props.selected ? styles.wrapperSelected : styles.wrapperUnselected]}>
                <PaimonText>{props.title}</PaimonText>
                <PaimonText>{durationProgress >= 100 ? '--:--' : remainDuration}</PaimonText>
            </View>
            <View style={{ ...styles.progressBar, width: `${durationProgress}%` }}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: 30,
        marginVertical: 5,
    },
    wrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        paddingHorizontal: 5,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        borderWidth: 0.5
    },
    wrapperUnselected: {
        borderColor: 'rgb(100,100,100)',
        backgroundColor: 'rgba(50,50,50,0.5)'
    },
    wrapperSelected: {
        borderColor: 'rgb(100,100,100)',
        backgroundColor: 'rgba(255,255,255,0.5)'
    },
    progressBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 2,
        backgroundColor: Colors.ACCENT
    }
});

export default React.memo(EpisodeItem);