import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Task Force!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: -10,
    backgroundColor: "#121212",
    height: "100%",
    color: "#f6f6f6",
  },
  text: {
    marginTop: 50,
    color: "#f6f6f6",
    fontSize: 20,
    textAlign: "center",
  },
});
