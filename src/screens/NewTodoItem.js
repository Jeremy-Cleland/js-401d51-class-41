import { Formik } from "formik";
import React from "react";
import { StyleSheet } from "react-native";
import { Button, TextInput, View } from "react-native";

export default function NewTodoItem() {
  function newTaskItem(values) {}

  return (
    <Formik initialValues={{ title: "" }} onSubmit={newTaskItem}>
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
          <TextInput
            color="red"
            placeholder="Code... Code... Code all the time!"
            placeholderTextColor="#707070"
            onChangeText={handleChange("title")}
            onBlur={handleBlur("title")}
            style={styles.input}
          />
          <Button
            backgroundColor="#171717"
            color={values.title.length > 3 ? "#f6f6f6" : "#505050"}
            title="Add Task"
            onPress={handleSubmit}
            style={styles.button}
          />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: -10,
    backgroundColor: "#121212",
    height: "100%",
    color: "#f6f6f6",
  },
  input: {
    marginTop: 50,
    borderWidth: 1,
    borderColor: "#707070",
    color: "#f6f6f6",
    padding: 10,
    borderRadius: 10,
  },
});
