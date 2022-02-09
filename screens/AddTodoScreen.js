import { View, Text, Platform, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useContext } from 'react';
import { Entypo } from '@expo/vector-icons';
import TodoContext from '../Context/TodoContext';

const AddTodoScreen = () => {

    const { addTodo } = useContext(TodoContext);
    const navigation = useNavigation();
    const [input, setInput] = useState('');

    function renderHeader() {
        return (
            <View style={{
                position: 'absolute',
                top: 30,
                left: 10
            }}>
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
                    onPress={() => navigation.goBack()}
                >
                    <Entypo name="chevron-thin-left" size={16} color={'blue'} />
                    <Text style={{ fontSize: 16, fontWeight: '300', color: 'blue', marginLeft: 5 }}>Go Back</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const handleSubmit = () => {
        addTodo(input);
        setInput('');
        navigation.goBack();
    }

    function renderForm() {
        return (
            <View style={{
                marginTop: 70,
                marginLeft: 10,
            }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Add Todo</Text>
                <View style={{
                    marginTop: 20,
                    paddingRight: 10,
                }}>
                    <TextInput onChangeText={text => setInput(text)} value={input} placeholder='Type here...' style={{ borderWidth: 1, alignItems: 'center', paddingVertical: 3, paddingLeft: 5, borderRadius: 10 }} />
                </View>
                <View style={{
                    marginTop: 20,
                    backgroundColor: !input ? '#ccc' : 'blue',
                    alignSelf: 'center',
                    width: '25%',
                    marginRight: 10,
                    borderRadius: 10,
                    paddingVertical: 5,
                }}>
                    <TouchableOpacity
                        style={{
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={handleSubmit}
                        disabled={!input}
                    >
                        <Text style={{ color: 'white', fontSize: 16 }}>ADD</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white', marginTop: Platform.OS === 'ios' ? 0 : 40 }}>
            {renderHeader()}
            {renderForm()}
        </View>
    );
};

export default AddTodoScreen;
