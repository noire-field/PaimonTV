import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Sidebar = (props) => {
    return (
        <View style={[props.style, styles.sidebar]}>
            <Image style={[styles.sidebarLogo]} source={require('./../assets/images/paimon_logo_circle.png')}/>
            <View>
                <FontAwesome5 style={styles.sidebarIcon} name='home' size={24} color="white"/>
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
        marginBottom: 10
    },
    sidebarText: {
        fontSize: 20
    }
});

export default React.memo(Sidebar);