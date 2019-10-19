import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, TextInput, Modal, Button, View, Animated, Easing, Dimensions, Image } from 'react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT, VERTICAL_GAP, HORIZONTAL_GAP } from '../../constats';

const CONTAINER_WIDTH = 150;
const CONTAINER_WIDTH_OPENED = 315;
const CONTAINER_HEIGHT = 150;
const CONTAINER_HEIGHT_OPENED = 400;

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
            alwaysVisible: true
        },
        2: {
            title: 'Mobile Data',
            icon: require('./icons/mobile-data.png'),
            active: false,
            alwaysVisible: true
        },
        3: {
            title: 'Wi-Fi',
            icon: require('./icons/wifi.png'),
            active: false,
            alwaysVisible: true
        },
        4: {
            title: 'Bluetooth',
            icon: require('./icons/bluetooth.png'),
            active: false,
            alwaysVisible: true
        },
        5: {
            title: 'Airdrop',
            icon: require('./icons/airdrop.png'),
            active: false,
            alwaysVisible: false
        },
        6: {
            title: 'Personal Hotspot',
            icon: require('./icons/hotspot.png'),
            active: false,
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
        Animated.timing(containerAnimation, {
            toValue: opened ? 0 : 1,
            duration,
            easing
        }).start();

        setOpened(!opened);
    };

    return (
        <TouchableOpacity onPress={handleContainerPress} activeOpacity={1}>
            <Animated.View style={[styles.container, containerStyle]}>
                <View style={styles.wrapper}>
                    { Object.entries(controllers).map(([key, controller]) => (
                        (controller.alwaysVisible || opened)
                        && (
                            <Animated.View key={key} style={[styles.item]}>
                                <TouchableOpacity activeOpacity={1} onPress={() => handleItemPress(key)}>
                                    <View style={[styles.icon, controller.active && styles.iconActive]}>
                                        <Image source={controller.icon} />
                                    </View>
                                    { opened && <Text style={[styles.title]}>{controller.title}</Text> }
                                    { opened && <Text style={[styles.switcher]}>{controller.active ? 'On' : 'Off'}</Text> }
                                </TouchableOpacity>
                            </Animated.View>
                        )
                    ))}
                </View>
            </Animated.View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems:'center',
        width: CONTAINER_WIDTH,
        height: CONTAINER_HEIGHT,
        borderRadius: 20
    },
    wrapper: {
        flexDirection:'row',
        flexWrap: 'wrap',
    },
    item: {
        width: '50%',
        padding: 10,
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
    iconActive: {
        backgroundColor: 'blue'
    },
    title: {
        marginTop: 10,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    switcher: {
        textAlign: 'center'
    }
});

export default ConnectionController


