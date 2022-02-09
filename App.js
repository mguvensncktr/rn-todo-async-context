import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import AddTodoScreen from './screens/AddTodoScreen';
import { TodoContextProvider } from "./Context/TodoContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TodoContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="AddTodo" component={AddTodoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TodoContextProvider>
  );
}

