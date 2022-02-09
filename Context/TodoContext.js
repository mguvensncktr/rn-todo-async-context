import React from 'react';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TodoContext = React.createContext();

export const TodoContextProvider = ({ children }) => {

    const STORE_KEY = '@TodoList';

    const [todoList, setTodoList] = useState([]);

    const addTodo = async (todo) => {
        try {
            await AsyncStorage.setItem(STORE_KEY, JSON.stringify([...todoList, todo]));
            setTodoList([...todoList, todo]);
        } catch (e) {
            console.log(e);
        }
    }

    const removeTodo = async (index) => {
        try {
            await AsyncStorage.setItem(STORE_KEY, JSON.stringify(todoList.filter((_, i) => i !== index)));
            setTodoList(todoList.filter((_, i) => i !== index));
        } catch (e) {
            console.log(e);
        }
    }

    const getTodoList = async () => {
        try {
            const todos = await AsyncStorage.getItem(STORE_KEY);
            setTodoList(JSON.parse(todos));
        } catch (e) {
            console.log(e);
        }
    }

    const clearTodoList = async () => {
        try {
            await AsyncStorage.setItem(STORE_KEY, JSON.stringify([]));
            setTodoList([]);
        } catch (e) {
            console.log(e);
        }
    }

    const updateTodo = async (index, todo) => {
        try {
            await AsyncStorage.setItem(STORE_KEY, JSON.stringify(todoList.map((t, i) => (i === index ? todo : t))));
            setTodoList(todoList.map((t, i) => (i === index ? todo : t)));
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <TodoContext.Provider value={{ todoList, addTodo, removeTodo, getTodoList, clearTodoList, updateTodo }}>
            {children}
        </TodoContext.Provider>
    );
}

export default TodoContext;
