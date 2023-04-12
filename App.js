import "react-native-gesture-handler";
import React from "react";
import { StyleSheet } from "react-native";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import Home from "./src/screens/Home.js";
import NewTodoItem from "./src/screens/NewTodoItem.js";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={style.plusIcon}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#121212",
          },
          headerTintColor: "#fff",
        }}
        initialRouteName="Home"
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            headerRight: () => (
              <FontAwesome
                name="plus-square"
                size={24}
                color="#fff"
                style={style.plusIcon}
                onPress={() => navigation.navigate("New")}
              />
            ),
          })}
        />
        <Stack.Screen name="New" component={NewTodoItem} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);

const style = StyleSheet.create({
  plusIcon: {
    marginRight: 10,
  },
});
