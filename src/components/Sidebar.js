import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import * as Colors from './../constants/colors';
import { appSetInitLoaded } from './../store/actions/app.action';

const Sidebar = (props) => {
    const [selected, setSelected] = useState(-1);
    const dispatch = useDispatch();

    const onMovieFocus = (index) => { setSelected(index); }
    const onMovieBlur = (index) => { setSelected(-1); }
    const onMoviePress = (index) => { 
        dispatch(appSetInitLoaded(false));
    }

    return (
        <View style={[props.style, styles.sidebar]}>
            <Image style={[styles.sidebarLogo]} source={require('./../assets/images/paimon_logo_circle.png')}/>
            <View>
                {/* <FontAwesome5 style={styles.sidebarIcon} name='home' size={24} color="white"/> */}
                <TouchableOpacity
                    onFocus={() => onMovieFocus(1)}
                    onBlur={() => onMovieBlur(1)}
                    onPress={() => onMoviePress(1)}
                >
                    <FontAwesome5 style={styles.sidebarIcon} name='sync' size={24} color={selected == 1 ? Colors.ACCENT : "white"}/>
                </TouchableOpacity>
            </View>
            <View></View>
        </View>
    )
}

const styles = StyleSheet.create({
    sidebar: {
        backgroundColor: 'rgb(5,5,5)',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    sidebarLogo: {
        resizeMode: 'stretch',
        height: 38,
        width: 38,
        marginTop: 15
    },
    sidebarIcon: {
        marginBottom: 10,
        padding: 5
    },
    sidebarText: {
        fontSize: 20
    }
});

export default React.memo(Sidebar);