import "react-native-gesture-handler";
import React from "react";
import { StyleSheet } from "react-native";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import Home from "./src/screens/Home.js";
import NewTodo from "./src/screens/NewTodo.js";
import { useFonts } from "expo-font";

const Stack = createStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    Caveat: require("./assets/fonts/Caveat.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <NavigationContainer style={style.plusIcon}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#121212",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontFamily: "Caveat",
            color: "#78838F",
          },
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
                color="#78838F"
                style={style.plusIcon}
                onPress={() => navigation.navigate("NewTodo")}
              />
            ),
          })}
        />
        <Stack.Screen name="NewTodo" component={NewTodo} />
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
