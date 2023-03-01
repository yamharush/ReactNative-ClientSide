import React, { FC, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  Alert,

} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import AuthModel, { Token } from "../model/AuthModel";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CommonActions } from '@react-navigation/native';
import UserModel, { UserUpdate } from "../model/UserModel";
import * as ImagePicker from 'expo-image-picker';
import { Colors } from "react-native/Libraries/NewAppScreen";
import yargsParser from "yargs-parser";


const UserDetailsPage: FC<{ navigation: any }> = ({ navigation }) => {
  const [fullName, setFullName] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>(
    "https://randomuser.me/api/portraits/men/1.jpg"
  );
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempFullName, setTempFullName] = useState(fullName);
  const [tempPicture, setTempPicture] = useState<string>("");

  var UriAfretChange = ""


  const loadUser = async () => {
    const id = await AsyncStorage.getItem('id')
    const res = await UserModel.getUserById(id)

    setFullName(res[0])
    setProfilePicture(res[1])
  }

  useEffect(() => {
    try {
      loadUser()
    } catch (err) {
      console.log('fail signup' + err)
    }
  }, []);

  const handleEditName = () => {
    setIsEditingName(true);
  };

  const handleTakePhoto = async () => {
    try {
      const res = await ImagePicker.launchCameraAsync()
      if (!res.canceled && res.assets.length > 0) {
        const uri = res.assets[0].uri;
        UriAfretChange = uri
        console.log("while: " + uri)
        console.log("while: " + UriAfretChange)
        setProfilePicture(uri)
        console.log("while pp: " + profilePicture)
      }
    } catch (err) {
      console.log("open camera error" + err)
    }
  };
  async function clearStorage() {
    await AsyncStorage.clear();
  }
  const pressHandlerLogOut = async () => {
    console.log("Logging out...");
    await AuthModel.logout();
    console.log("Clearing storage...");
    await clearStorage();
    console.log("Resetting navigation stack...");
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'LoginPage' }],
      })
    );
    console.log("Loading user details...");
    loadUser();
  };


  const handleSaveName = async () => {
    setFullName(tempFullName);
    const id_ = await AsyncStorage.getItem('id')
    const up: UserUpdate = {
      id: id_,
      name: tempFullName,
      avatarUrl: profilePicture
    }
    try {
      const res = await UserModel.upadteUser(up)
      console.log("update user success")
    } catch (err) {
      console.log("update user failed " + err)
    }

    setIsEditingName(false);
  };

  const handleCancelEditName = () => {
    setTempFullName(fullName);
    setIsEditingName(false);
  };

  const handleEditPicture = async () => {
    console.log("before: " + profilePicture)
    await handleTakePhoto()
    console.log("after: " + profilePicture)
    const id_ = await AsyncStorage.getItem('id')
    const up: UserUpdate = {
      id: id_,
      name: fullName,
      avatarUrl: UriAfretChange
    }
    try {
      const res = await UserModel.upadteUser(up)
      console.log("update user success")
    } catch (err) {
      console.log("update user failed " + err)
    }
  };

  const renderName = () => {
    if (isEditingName) {
      return (
        <View style={styles.nameContainer}>
          <TextInput
            style={styles.fullNameInput}
            placeholderTextColor={'lightslategrey'}
            value={tempFullName}
            onChangeText={(text) => setTempFullName(text)}

          />
          <TouchableOpacity onPress={handleSaveName}>
            <FontAwesome name="save" size={24} color="lightslategrey" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancelEditName}>
            <AntDesign name="close" size={24} color="lightslategrey" />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.nameContainer}>
          <Text style={styles.fullName}>{fullName}</Text>
          <TouchableOpacity onPress={handleEditName} >
            <FontAwesome name="edit" size={24} color="hotpink" />
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={() => pressHandlerLogOut()}>
        <FontAwesome name="sign-out" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.profilePictureContainer}>
        <Image style={styles.profilePicture} source={{ uri: profilePicture }} />
      </View>
      <View style={styles.editButtonContainer}>
        <TouchableOpacity onPress={handleEditPicture}>
          <FontAwesome name="file-photo-o" size={24} color="pink" selectionColor={'grey'} />
        </TouchableOpacity>
      </View>
      {renderName()}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.seeAllPostsButton}
          onPress={() => navigation.navigate("AllPostsPage")}
        >
          <AntDesign name="book" size={24} color="grey" />
          <Text style={styles.createPostButtonText}>See All Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.createPostButton}
          onPress={() => navigation.navigate("CreatePostPage")}
        >
          <AntDesign name="plus" size={24} color="grey" />
          <Text selectionColor={'black'} style={styles.createPostButtonText}>Create Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    marginTop: 20,
  },
  createPostButton: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    backgroundColor: "pink",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "pink",
    padding: 10,
    borderRadius: 10,
  },
  seeAllPostsButton: {
    backgroundColor: "pink",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  logoutButtonText: {
    color: 'grey',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  createPostButtonText: {
    color: "grey",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  profilePictureContainer: {
    marginVertical: 20,
  },
  editButtonContainer: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 200,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    right: 105,
    top: 85, // new position for the editButtonContainer
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  profilePicture: {
    width: 220,
    height: 220,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "grey",
  },
  cancelText: {
    fontSize: 18,
    color: "blue",
    padding: 5,
    fontWeight: "bold",
    backgroundColor: "#DDDDDD",
    borderRadius: 6,
    margin: 5,
  },
  saveText: {
    fontSize: 18,
    color: "blue",
    padding: 5,
    fontWeight: "bold",
    backgroundColor: "#DDDDDD",
    borderRadius: 6,
  },
  nameContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  fullName: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 10,
  },
  fullNameInput: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 10,
    borderBottomWidth: 1,
    borderColor: "lightslategrey ",
    padding: 5,
  },
  editText: {
    fontSize: 18,
    color: "pink",
    padding: 5,
    fontWeight: "bold",
    backgroundColor: "red",
    borderRadius: 6,
    margin: 5,
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 10,
  }, buttonLogOut: {
    margin: 12,
    padding: 12,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 5,
  },
  plusIcon: {
    fontSize: 24,
    color: "#000",
  },
  editProfilePictureButton: {
    position: "absolute",
    bottom: 0,
    right: 75,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  editProfilePictureIcon: {
    fontSize: 20,
    color: "pink",
  },
});

export default UserDetailsPage;
