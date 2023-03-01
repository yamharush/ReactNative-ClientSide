import React, { useEffect, useState } from "react";
import { FC } from "react";
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  Alert,
  AsyncStorage,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import UserModel, { Post } from "../model/UserModel";



const CreatePostPage: FC<{navigation: any}> = ({navigation}) => {
  
  const [description, setDescription] = useState("");
  const [avatarUri, setAvatrUri] = useState("")

  const askPermission = async() =>{
    try{
      const ress = await ImagePicker.getCameraPermissionsAsync()
      if(!ress.granted){
        alert("camera permission required")
      }
    }catch(err){
      console.log('ask permission failed ' + err)
    }
  }

  useEffect(()=>{
    askPermission()
  },[])


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

  const handlePost = async () => {
    if (avatarUri != "") {
      const url = await UserModel.uploadImage(avatarUri)
      const sender = await AsyncStorage.getItem('id')
      console.log(sender)
      const post:Post = {
        message: description,
        sender: sender,
        avatarUrl: url
      }
      try{
        await UserModel.addNewPost(post)
      }catch(err){
        console.log("cant create post " + err)
      }
    }
    Alert.alert("Your Post is Live!\n", `Description: ${description}`);
    navigation.goBack()
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
        style={styles.descriptionInput}
        placeholder="Describe the picture"
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity style={styles.postButton} onPress={handlePost}>
        <Text style={styles.postButtonText}>POST</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  choosePhotoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#999",
    marginBottom: 10,
  },
  takePhotoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007aff",
    marginBottom: 20,
  },
  descriptionInput: {
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    width: "100%",
    minHeight: 100,
    marginBottom: 20,
    textAlignVertical: "top",
  },
  postButton: {
    backgroundColor: "#007aff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  postButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});


export default CreatePostPage;