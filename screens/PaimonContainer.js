import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const PaimonContainer = (props) => {
    return (
        <View style={styles.container}>
            <Text>Paimon Container</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
        borderColor: 'red',
        borderWidth: 1
    }
});

export default PaimonContainer;