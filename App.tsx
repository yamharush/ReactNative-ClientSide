import { FC } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import UserDetailsPage from "./components/UserDetailsPage";
import CreatePostPage from "./components/CreatePostPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AllPostsPage from "./components/AllPostsPage";

const Stack = createNativeStackNavigator();

const App: FC = () => {
  const clickHandler = () => {
    alert("Clicked");
  };
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ title: "Apply to all" }}>
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ title: "Login" }}
        ></Stack.Screen>
        <Stack.Screen
          name="SignupPage"
          component={SignupPage}
          options={{ title: "Signup" }}
        ></Stack.Screen>
        <Stack.Screen
          name="UserDetailsPage"
          component={UserDetailsPage}
          options={{ title: "User Details" }}
        ></Stack.Screen>
        <Stack.Screen
          name="CreatePostPage"
          component={CreatePostPage}
          options={{ title: "Create Post" }}
        ></Stack.Screen>
        <Stack.Screen
          name="AllPostsPage"
          component={AllPostsPage}
          options={{ title: "All Posts" }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textStyle: {
    color: "green",
    fontWeight: "bold",
    fontSize: 50,
  },
});

export default App;