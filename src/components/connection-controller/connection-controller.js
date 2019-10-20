import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Animated, Easing, ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur';

import { SCREEN_WIDTH, SCREEN_HEIGHT, VERTICAL_GAP, HORIZONTAL_GAP } from '../../constats';

const CONTAINER_WIDTH = 150;
const CONTAINER_WIDTH_OPENED = 315;
const CONTAINER_HEIGHT = 150;
const CONTAINER_HEIGHT_OPENED = 410;

const airplaneIcon = import('./icons/aeroplane.png');

const ConnectionController = () => {
    const [text, setText] = useState('lal');
    const [opened, setOpened] = useState(false);

    const [containerAnimation] = useState(new Animated.Value(0));
    // const [itemAnimation] = useState(new Animated.Value(0));

    const duration = 300;
    const easing = Easing.bezier(.31,.8,.87,1.02)

    const [controllers, setControllers] = useState({
        1: {
            title: 'Airplane Mode',
            icon: require('./icons/aeroplane.png'),
            active: false,
            activeColor: '#007AFF',
            alwaysVisible: true
        },
        2: {
            title: 'Mobile Data',
            icon: require('./icons/mobile-data.png'),
            active: false,
            activeColor: '#4CD964',
            alwaysVisible: true
        },
        3: {
            title: 'Wi-Fi',
            icon: require('./icons/wifi.png'),
            active: false,
            activeColor: '#007AFF',
            alwaysVisible: true
        },
        4: {
            title: 'Bluetooth',
            icon: require('./icons/bluetooth.png'),
            active: false,
            activeColor: '#007AFF',
            alwaysVisible: true
        },
        5: {
            title: 'Airdrop',
            icon: require('./icons/airdrop.png'),
            active: false,
            activeColor: '#007AFF',
            alwaysVisible: false
        },
        6: {
            title: 'Personal Hotspot',
            icon: require('./icons/hotspot.png'),
            active: false,
            activeColor: '#4CD964',
            alwaysVisible: false
        }
    });

    const translateX = containerAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, (SCREEN_WIDTH - CONTAINER_WIDTH_OPENED - (HORIZONTAL_GAP * 2)) / 2]
    });

    const translateY = containerAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, (SCREEN_HEIGHT - CONTAINER_HEIGHT_OPENED - (VERTICAL_GAP * 2)) / 2]
    });

    const height = containerAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [CONTAINER_HEIGHT, CONTAINER_HEIGHT_OPENED]
    });

    const width = containerAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [CONTAINER_WIDTH, CONTAINER_WIDTH_OPENED]
    });

    // const scaleContainer = containerAnimation.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: [1, 2]
    // });
    //
    // const scaleItem = itemAnimation.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: [1, 0.5]
    // });

    const containerStyle = [{ transform: [{ translateX }, { translateY }], height, width }];
    // const itemStyle = [{ transform: [{ scale: scaleItem }] }];

    const handleItemPress = (value) => {
        const currentControllers = {
            ...controllers,
            [value]: {
                ...controllers[value],
                active: !controllers[value].active
            }
        };

        setControllers(currentControllers)
    };

    const handleContainerPress = () => {
        if (opened) return;

        Animated.timing(containerAnimation, {
            toValue: 1,
            duration,
            easing
        }).start();

        setOpened(true);
    };

    // const handleOutsideContainerPress = () => {
    //     // if (!opened) return;
    //
    //     Animated.timing(containerAnimation, {
    //         toValue: 0,
    //         duration,
    //         easing
    //     }).start();
    //
    //     setOpened(false);
    // };

    return (
        <TouchableOpacity onPress={handleContainerPress} activeOpacity={1}>
            <Animated.View style={[styles.container, containerStyle]}>
                <BlurView tint='dark' intensity={70} style={[styles.wrapper, opened && styles.openedWrapper]}>
                    { Object.entries(controllers).map(([key, controller]) => (
                        (controller.alwaysVisible || opened)
                        && (
                            <Animated.View key={key} style={[styles.item, opened && styles.openedItem]}>
                                <TouchableOpacity activeOpacity={1} onPress={() => handleItemPress(key)}>
                                    <View style={[styles.icon, controller.active && {'backgroundColor': controller.activeColor}]}>
                                        <ImageBackground resizeMode='center' source={controller.icon} style={styles.iconItem} />
                                    </View>
                                    { opened && <Text style={[styles.title]}>{controller.title}</Text> }
                                    { opened && <Text style={[styles.switcher]}>{controller.active ? 'On' : 'Off'}</Text> }
                                </TouchableOpacity>
                            </Animated.View>
                        )
                    ))}
                </BlurView>
            </Animated.View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems:'center',
        width: CONTAINER_WIDTH,
        height: CONTAINER_HEIGHT,
        zIndex: 5
    },
    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'red',
        zIndex: 0
    },
    wrapper: {
        flex: 1,
        flexDirection:'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        borderRadius: 20,
        overflow: 'hidden'
    },
    openedWrapper: {
        paddingTop: 30
    },
    item: {
        width: '45%',
        marginBottom: 15
    },
    openedItem: {
        width: '48%',
        marginBottom: 30
    },
    icon: {
        justifyContent: 'center',
        alignItems:'center',
        alignSelf: 'center',
        width: 50,
        height: 50,
        backgroundColor: '#979797',
        borderRadius: 50,
    },
    iconItem: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    title: {
        marginTop: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    },
    switcher: {
        textAlign: 'center',
        color: 'white'
    }
});

export default ConnectionController


