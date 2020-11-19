import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, TouchableOpacity, TVEventHandler, Animated } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import PaimonText from './../../components/PaimonText';

import * as Colors from './../../constants/colors';
import Logger from './../../utils/logger';

const VideoControl = (props) => {
    Logger.Debug(`[VideoControl] Render`);

    const controlFading = useRef(false);
    const pressCount = useRef(0);
    const fadeAnim = useRef(new Animated.Value(0))

    const [controlShown, setControlShown] = useState(false);
    const [focusRow, setFocusRow] = useState(1);
    const [playing, setPlaying] = useState(false);

    const movieTitle = useSelector(state => state.watch.movieTitle);
    const episodeTitle = useSelector(state => state.watch.episode.title);


    const HideControl = () => {
        if(controlFading.current || !controlShown) return;

        controlFading.current = true;
        fadeAnim.current.setValue(1);
        Animated.timing(fadeAnim.current, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true
        }).start(() => {
            controlFading.current = false;
        });

        setControlShown(false);
    }

    const ShowControl = () => {
        if(controlFading.current || controlShown) return;

        controlFading.current = true;

        fadeAnim.current.setValue(0);
        Animated.timing(fadeAnim.current, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true
        }).start(() => {
            controlFading.current = false;
        });

        setControlShown(true);
    }

    const OnMoveHorizontal = (moveUp) => {
        pressCount.current++
        if(pressCount.current % 2 != 0)
            return;

        ShowControl();

        if(moveUp) { setFocusRow(0); } 
        else { setFocusRow(1); }
    }

    const OnSelect = () => {
        pressCount.current++
        if(pressCount.current % 2 != 0)
            return;

        ShowControl();

        //if(focusRow == 1) { // The Play/Pause button
        

         // Directional Pad double-click bug fix
        setPlaying(playing ? false: true);
        
        //}
    }

    useEffect(() => {
        if(controlShown) {
            var handler = setTimeout(HideControl, 1500);
            return () => { clearTimeout(handler); }
        }
    });

    useEffect(() => {
        var eventHandler = new TVEventHandler();
        eventHandler.enable(this, (cmp, evt) => {
            switch(evt.eventType) {
                case 'up': OnMoveHorizontal(true); break;
                case 'down': OnMoveHorizontal(false); break;
                case 'select': OnSelect(); break;
            }
        });

        return () => { eventHandler.disable(); }
    })

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Animated.View style={{ opacity: fadeAnim.current }}>
                    <View style={[styles.progressBar, focusRow == 0 ? styles.progressBarSelected : {}]}>
                        <View style={[ styles.progress, { width: '25%' }]}></View>
                        <View style={[ styles.progressPoint, focusRow == 0 ? styles.progressPointSelected : {}, { left: '25%' }]}></View>
                    </View>
                    <View style={styles.buttons}>
                        <View style={styles.leftButtons}>
                            <PaimonText style={styles.titleText} numberOfLines={1}>{movieTitle}</PaimonText>
                            <PaimonText style={styles.episodeText} numberOfLines={1}>{episodeTitle}</PaimonText>
                        </View>
                        <View style={styles.centerButtons}>
                            <TouchableOpacity>
                                <View style={styles.button}>
                                    <FontAwesome5 name={playing ? 'pause' : 'play'} size={focusRow == 1 ? 26 : 24} color={focusRow == 1 ? Colors.TEXT_FOCUS : Colors.TEXT_BLUR}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.rightButtons}>
                            <PaimonText style={styles.timeText}>23:00:00</PaimonText>
                        </View>
                    </View>
                </Animated.View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
	container: {
        position: 'absolute', // its parent is relative
        bottom: 0,
        left: 0,
        width: '100%',
        height: '15%'
    },
    wrapper: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    progressBar: {
        position: 'relative',
        height: 3,
        backgroundColor: 'rgba(175,175,175,.5)',
        marginTop: 1,
        marginBottom: 15
    },
    progressBarSelected: {
        height: 5,
        marginTop: 0,
        marginBottom: 14
    },
    progress: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        backgroundColor: 'red'
    },
    progressPoint: {
        position: 'absolute',
        top: -6,
        borderRadius: 50,
        width: 15,
        height: 15,
        backgroundColor: 'red'
    },
    progressPointSelected: {
        top: -5
    },
    buttons: {
        height: '75%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    leftButtons: {
        flex: 1,
        alignItems: 'flex-start'
    },
    centerButtons: {
        flex: 1,
        alignItems: 'center'
    },
    rightButtons: {
        flex: 1,
        alignItems: 'flex-end'
    },
    timeText: {
        fontSize: 17
    }
});

export default React.memo(VideoControl);