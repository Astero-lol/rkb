import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';

import { BlurView } from 'expo-blur';

const CONTAINER_WIDTH = 150;
const CONTAINER_HEIGHT = 150;

const Player = () => {
    return (
        <BlurView style={styles.container} tint='dark' intensity={70}>
            <View style={styles.info}>
                <Text style={styles.song}>Creep</Text>
                <Text style={styles.singer}>Radiohead</Text>
            </View>
            <View style={styles.controllers}>
                <ImageBackground source={require('./icons/prev.png')} style={styles.controller} />
                <ImageBackground source={require('./icons/play.png')} style={[styles.controller, styles.controllerPlay]} />
                <ImageBackground source={require('./icons/next.png')} style={styles.controller} />
            </View>
        </BlurView>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: CONTAINER_WIDTH,
        height: CONTAINER_HEIGHT,
        paddingVertical: 25,
        paddingHorizontal: 15,
        borderRadius: 20
    },
    song: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,
        textAlign: 'center'
    },
    singer: {
        color: 'white',
        textAlign: 'center',
        fontSize: 17
    },
    controllers: {
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    controller: {
        width: 24,
        height: 16
    },
    controllerPlay: {
        height: 28
    }
});

export default Player
