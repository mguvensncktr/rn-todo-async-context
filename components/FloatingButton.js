import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

const FloatingButton = () => {

    const navigation = useNavigation();

    return (
        <View style={{
            position: 'absolute',
            right: 30,
            bottom: 50,
            backgroundColor: 'blue',
            borderRadius: 30,
            width: 60,
            height: 60,
            zIndex: 10,
        }}>
            <TouchableOpacity
                style={{
                    width: 60,
                    height: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => navigation.navigate('AddTodo')}
            >
                <Entypo name="plus" size={26} color={'white'} />
            </TouchableOpacity>
        </View >
    );
};

export default FloatingButton;
