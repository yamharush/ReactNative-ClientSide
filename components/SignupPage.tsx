import React from "react";
import { FC, useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import AuthModel, { User } from "../model/AuthModel";
import * as ImagePicker from 'expo-image-picker';

const SignupPage: FC<{ navigation: any }> = ({ navigation }) => {
  const [avatarUri, setAvatrUri] = useState("")
  const [username, onText1Change] = useState<string>("");
  const [password, onText2Change] = useState<string>("");
  const [confirmPassword, onText3Change] = useState<string>("");
  const [name, onText4Change] = useState<string>("");
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);

  const handleChoosePhoto = async () => {
    try{
      const res = await ImagePicker.launchImageLibraryAsync()
      if(!res.canceled && res.assets.length > 0){
        const uri = res.assets[0].uri;
        setAvatrUri(uri)
      }
    }catch(err){
      console.log("open camera error" + err)
    }
  };

  const handleTakePhoto = async () => {
    try{
      const res = await ImagePicker.launchCameraAsync()
      if(!res.canceled && res.assets.length > 0){
        const uri = res.assets[0].uri;
        setAvatrUri(uri)
      }
    }catch(err){
      console.log("open camera error" + err)
    }
  };

  const pressHandlerSignUp = async () => {
    alert("Hi " + name + " Welcome to the app , please log in");
    const user: User = {
      email: username,
      name: name,
      password: password,
      avatarUrl: avatarUri
    }
    try{
      await AuthModel.register(user)
      console.log('success signup signuppage')
    } catch(err) {
      console.log('fail signup' + err)
    }
    navigation.goBack()
  };

  const onConfirmPasswordChange = (text: string) => {
    onText3Change(text);
    setPasswordsMatch(text === password);
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <TouchableOpacity onPress={handleChoosePhoto}>
        <View style={styles.imageContainer}>
          {avatarUri && <Image source={{uri:avatarUri}} style={styles.image} />}
          {!avatarUri && <Text style={styles.choosePhotoText}>Choose Photo</Text>}
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleTakePhoto}>
        <Text style={styles.takePhotoText}>Take Photo</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        onChangeText={onText1Change}
        placeholder="email"
        value={username}
      />
      <TextInput
        style={styles.input}
        onChangeText={onText4Change}
        placeholder="name"
        value={name}
      />
      <TextInput
        style={styles.input}
        onChangeText={onText2Change}
        placeholder="password"
        value={password}
        secureTextEntry={true}
      />
      <TextInput
        style={[styles.input, !passwordsMatch ? styles.inputError : null]}
        onChangeText={onConfirmPasswordChange}
        placeholder="confirm password"
        value={confirmPassword}
        secureTextEntry={true}
      />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={pressHandlerSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
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
    height: 150,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
  },
  choosePhotoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#999",
    textAlign:'center'
  },
  takePhotoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007aff",
    marginBottom: 20,
    resizeMode: "contain",
    alignSelf: "center",
  },
  imageContainer: {
    backgroundColor: "#f0f0f0",
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  inputError: {
    borderColor: "red",
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
    padding: 5,
    borderRadius: 10,
  },
  buttonText: {
    padding: 10,
  },
});

export default SignupPage;
