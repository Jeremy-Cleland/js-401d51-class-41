import React from "react";
import {
  Button,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
} from "react-native";
import { Formik } from "formik";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
// import BouncyCheckbox from "react-native-bouncy-checkbox";
import { todoItemSchema } from "../../schemas";
import uuid from "react-native-uuid";
import { useFonts } from "expo-font";

export default function NewTodo({ navigation }) {
  const [loaded] = useFonts({
    Caveat: require("../../assets/fonts/Caveat.ttf"),
  });
  const { getItem, setItem } = useAsyncStorage("todo");

  function newTask(values) {
    getItem()
      .then((todoJSON) => {
        let todo = todoJSON ? JSON.parse(todoJSON) : [];
        //add a new item to the list
        todo.push({
          id: uuid.v4(),
          task: values.task,
          priority: values.priority,
        });
        setItem(JSON.stringify(todo))
          .then(() => {
            //navigate back to home screen
            navigation.goBack();
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <ScrollView style={styles.appContainer} keyboardShouldPersistTaps="handled">
      <SafeAreaView>
        <Text style={styles.title}>Add New Task</Text>
        <View
          style={[styles.formContainer, styles.shadowProp, styles.elevation]}
        >
          <Formik
            initialValues={{ task: "", priority: "" }}
            validationSchema={todoItemSchema}
            onSubmit={newTask}
          >
            {({ values, handleChange, handleSubmit }) => (
              <View>
                <TextInput
                  placeholder="Add New Task"
                  style={styles.input}
                  type="text"
                  name="task"
                  value={values.task}
                  onChangeText={handleChange("task")}
                  placeholderTextColor="#78838F"
                />
                <TextInput
                  placeholder="Add Priority"
                  type="text"
                  name="priority"
                  value={values.priority}
                  style={[styles.input, styles.shadowProp, styles.elevation]}
                  onChangeText={handleChange("priority")}
                  placeholderTextColor="#78838F"
                />
                <Button
                  style={styles.button}
                  title="Submit"
                  onPress={handleSubmit}
                />
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  appContainer: {
    height: "100%",
    width: "100%",
    padding: 10,
    backgroundColor: "#171717",
  },
  formContainer: {
    height: 250,
    width: 350,
    paddingVertical: 50,
    paddingHorizontal: 15,
    alignContent: "center",
    alignSelf: "center",
    backgroundColor: "#222222",
    borderRadius: 10,
  },
  title: {
    fontFamily: "Caveat",
    color: "#fff",
    padding: 30,
    fontSize: 25,
    textAlign: "center",
  },
  input: {
    height: 40,
    width: 300,
    alignSelf: "center",
    margin: 12,
    padding: 10,
    borderWidth: 1,
    padding: 10,
    color: "#fff",
    backgroundColor: "#171717",
    borderRadius: 10,
    fontFamily: "Caveat",
  },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  elevation: {
    elevation: 20,
    shadowColor: "#000",
  },
  button: {
    fontFamily: "Caveat",
    color: "#fff",
    padding: 30,
    fontSize: 25,
    textAlign: "center",
  },
});
