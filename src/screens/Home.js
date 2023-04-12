import React, { useState, useEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { reach } from "yup";
import { useFonts } from "expo-font";

export default function Home({ navigation }) {
  const [loaded] = useFonts({
    Caveat: require("../../assets/fonts/Caveat.ttf"),
  });

  const { getItem } = useAsyncStorage("todo");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const keyExtractor = (item, index) => index.toString();

  function getTodoList() {
    getItem()
      .then((todoJSON) => {
        const todo = todoJSON ? JSON.parse(todoJSON) : [];
        setItems(todo);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function renderCard({ item }) {
    reach;
    return (
      <Card
        containerStyle={{ backgroundColor: "#171717", borderColor: "#78838F" }}
      >
        <Card.Title
          style={{ color: "#78838F", fontFamily: "Caveat", fontSize: 20 }}
        >
          Task: {item.task}
        </Card.Title>
        <Card.Divider style={{ color: "#78838F" }} />
        <Card.Title style={styles.cardTitle}>
          Priority: {item.priority}
        </Card.Title>
      </Card>
    );
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", getTodoList);

    return unsubscribe;
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        refreshing={loading}
        onRefresh={getTodoList}
        style={styles.list}
        data={items}
        renderItem={renderCard}
        keyExtractor={keyExtractor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Caveat",
  },
  cardContainer: {
    textAlign: "left",
    fontFamily: "Caveat",
  },

  list: {
    width: "100%",
    fontFamily: "Caveat",
  },
  cardTitle: {
    textAlign: "left",
    fontSize: 20,
    color: "#78838F",
    fontFamily: "Caveat",
  },
});
