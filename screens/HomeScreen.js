import { View, Text, Platform, TouchableOpacity, Modal, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { Entypo } from '@expo/vector-icons';
import FloatingButton from '../components/FloatingButton';
import TodoContext from '../Context/TodoContext';

const HomeScreen = () => {

    const { todoList, removeTodo, getTodoList, clearTodoList, updateTodo } = useContext(TodoContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [index, setIndex] = useState(0);
    const [todo, setTodo] = useState('');
    const [updatedTodo, setUpdatedTodo] = useState('');

    useEffect(() => {
        getTodoList();
    }, []);

    const handleModal = (index, todo) => {
        setModalVisible(true);
        setIndex(index);
        setTodo(todo);
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white', marginTop: Platform.OS === 'ios' ? 20 : 40 }}>
            <StatusBar style="auto" />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ margin: 10, fontSize: 24, fontWeight: 'bold' }}>Todo List</Text>
                <TouchableOpacity
                    onPress={() => clearTodoList()}
                >
                    {todoList.length === 0 ? null : <Text style={{ marginRight: 20, color: 'red', fontSize: 18, fontWeight: 'bold' }}>Clear All</Text>}
                </TouchableOpacity>
            </View>
            <FloatingButton />
            {todoList && todoList.length > 0 ?
                <View style={{ flex: 1 }}>
                    {todoList.map((todo, index) => (
                        <View key={index} style={{
                            marginTop: 10,
                            marginLeft: 10,
                            marginRight: 10,
                            padding: 10,
                            backgroundColor: '#f1f1f1',
                            borderRadius: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{todo}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => handleModal(index, todo)} style={{ marginRight: 10 }}>
                                    <Entypo name="pencil" size={20} color={'blue'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => removeTodo(index)}>
                                    <Entypo name="trash" size={20} color={'red'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
                :
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>No Todo Found!</Text>
                </View>


            }
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={{ backgroundColor: 'rgba(54, 54, 54, 0.5)', flex: 1, borderTopStartRadius: 40, borderTopEndRadius: 40 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', marginTop: 40, fontSize: 24, fontWeight: '400' }}>Edit Todo</Text>
                        <Text style={{ color: 'white', marginTop: 10, fontSize: 16 }}>{todo}</Text>
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={{
                                position: 'absolute',
                                right: 20,
                            }}
                        >
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: '500' }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginHorizontal: 20, marginTop: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <TextInput placeholder='Type to edit' onChangeText={text => setUpdatedTodo(text)} placeholderTextColor={'white'} style={{ borderWidth: 1, borderRadius: 10, borderColor: 'white', paddingVertical: 5, paddingLeft: 10, flex: 1, color: 'white', fontSize: 18 }} />
                    </View>
                    <TouchableOpacity
                        style={{ width: 60, height: 30, backgroundColor: 'blue', borderRadius: 10, marginTop: 20, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}
                        onPress={() => {
                            updateTodo(index, updatedTodo);
                            setModalVisible(false);
                        }}
                    >
                        <Entypo name="chevron-right" size={24} color={'white'} />
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

export default HomeScreen;
