import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PaimonButton = (props) => {
    return (
        <View style={[{...styles.button, backgroundColor: props.color}, props.selected ? styles.buttonSelected : styles.buttonUnselected]}><Text style={styles.text}>{props.title}</Text></View>
    )
}

const styles = StyleSheet.create({
    button: {
        elevation: 1,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    buttonSelected: {
        borderWidth: 1,
        borderColor: 'white'
    },
    buttonUnselected: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,.5)'
    },
    text: {
        color: 'white'
    }
});

export default React.memo(PaimonButton);