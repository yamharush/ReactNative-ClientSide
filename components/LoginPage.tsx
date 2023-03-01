import React, { useEffect } from "react";
import { FC, useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import AuthModel, { User } from "../model/AuthModel";
import { AsyncStorage } from 'react-native';
import { AntDesign } from "@expo/vector-icons";

const LoginPage: FC<{ navigation: any }> = ({ navigation }) => {
  const [username, onText1Change] = useState<string>("");
  const [name, onText4Change] = useState<string>("");
  const [password, onText2Change] = useState<string>("");
  const [avatarUri, setAvatrUri] = useState("")
  //Stay Log In
  useEffect(() => {
    AsyncStorage.getItem('refreshToken').then(async token => {
      if (token) {
        navigation.replace("UserDetailsPage");
      }
    });
  }, [navigation]);

  const pressHandlerLogin = async () => {
    const user: User = {
      email: username,
      name: name,
      password: password,
      avatarUrl: avatarUri
    };
    const d = await AuthModel.login(user)
      .then(async (data) => {
        if (typeof (data) === 'undefined') {
          console.log('login failed:', data);
          Alert.alert("Try Again")
        } else {
          console.log('login successful:', data);
          await AsyncStorage.setItem('accessToken', data[0]);
          await AsyncStorage.setItem('id', data[1]);
          await AsyncStorage.setItem('refreshToken', data[2]);
          navigation.replace("UserDetailsPage");
        }
      })
      .catch((err) => {
        console.log('login failed:', err);
      });
  };

  const pressHandlerSignUp = () => {
    navigation.navigate("SignupPage");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={onText1Change}
          placeholder="Email"
          value={username}
        />
        <TextInput
          style={styles.input}
          onChangeText={onText2Change}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
        />

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={pressHandlerLogin}>
            <AntDesign name="login" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={pressHandlerSignUp}>
            <FontAwesome name="user-plus" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.text}>or</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userPictureStyle: {
    marginTop: 10,
    height: 200,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignSelf: "baseline",
  },
  button: {
    flex: 1,
    margin: 10,
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
  },
  text: {
    alignSelf: "center",
    marginTop: 15,
  },
});
export default LoginPage;