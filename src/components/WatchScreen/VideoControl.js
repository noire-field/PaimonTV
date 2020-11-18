import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, TouchableOpacity, TVEventHandler, Animated } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import PaimonText from './../../components/PaimonText';

import * as Colors from './../../constants/colors';
import Logger from './../../utils/logger';

const VideoControl = (props) => {
    Logger.Debug(`[VideoControl] Render`);

    const [visible, setVisible] = useState(false);
    const [focusRow, setFocusRow] = useState(1);
    const [playing, setPlaying] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0))
    const invisbleTimeoutHandler = useRef(null);

    console.log(focusRow);

    const HideControl = () => {
        fadeAnim.current.setValue(1);
        Animated.timing(fadeAnim.current, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true
        }).start();

        setVisible(false);
    }

    const ShowControl = () => {
        // fadeAnim.current.setValue(0); // Unnecessary?
        Animated.timing(fadeAnim.current, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true
        }).start();

        setVisible(true);
    }

    const OnMoveHorizontal = (moveUp) => {
        console.log("Visible : " +visible);
        ShowControl();

        if(moveUp) {
            console.log("Move Up");
            setFocusRow(0);
        } else {
            console.log("Move Down");
            setFocusRow(1);
        }
    }

    const OnSelect = () => {
        ShowControl();

        if(focusRow == 1) {
            console.log("WTF");
            setPlaying(playing ? false: true);
        }
    }


    useEffect(() => {
        if(visible) {
            var handler = setTimeout(HideControl, 3000);
            return () => { clearTimeout(handler); }
        }
    }, [visible]);

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
    }, [])

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
                            <PaimonText style={styles.timeText} numberOfLines={1}>Star Wars: Episode II - Attack Of The Clones</PaimonText>
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