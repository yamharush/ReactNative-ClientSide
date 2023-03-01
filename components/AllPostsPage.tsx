import React from 'react';
import { FC, useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, TextInput, FlatList, TouchableHighlight } from 'react-native';
import UserModel, { Post } from '../model/UserModel';


const ListItem: FC<{ message: String, sender: String, avatarUrl: String, onRowSelected: (sender: String) => void }> =
    ({ message, sender, avatarUrl, onRowSelected }) => {
        const onClick = () => {
            console.log('int he row: row was selected ' + sender)
            console.log('int he row: avatrUrl ' + avatarUrl)
            onRowSelected(sender)
        }

        const [userPic, setPic] = useState<String>("");
        const [userName, setName] = useState<String>("");

        const getUserDetails = async () => {
            try {
                console.log("sender : " + sender)
                const user = await UserModel.getUserById(sender)
                console.log("getting user by ID " + user)
                setName(user[0])
                setPic(user[1])
            } catch (err) {
                console.log("fail getting user by ID " + err)
            }
        }

        useEffect(() => {
            getUserDetails()
        })

        return (
            <TouchableHighlight onPress={onClick} underlayColor={'gainsboro'}>
                <View style={styles.listRow}>
                    {avatarUrl == "" && <Image style={styles.listRowImage} source={require('../assets/avatar-icon-images-4.jpg')} />}
                    {avatarUrl != "" && <Image style={styles.listRowImage} source={{ uri: avatarUrl }} />}

                    <View style={styles.listRowTextContainer}>
                        <Text style={styles.listRowName}>{message}</Text>
                        <View style={styles.userDetailsRow}>
                            <Image style={styles.profilePicture} source={{ uri: userPic }} />
                            <Text style={styles.listRowId}>{userName}</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }


const AllPostsPage: FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
    const onRowSelected = (sender: String) => {
        console.log("in the list: row was selected " + sender)
    }

    const [posts, setPosts] = useState<Array<Post>>();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            console.log('focus')
            let posts: Post[] = []
            try {
                posts = await UserModel.getAllPosts()
                console.log("fetching posts complete")
            } catch (err) {
                console.log("fail fetching posts " + err)
            }
            console.log("fetching finish")
            setPosts(posts)
        })
        return unsubscribe
    })


    return (
        <FlatList style={styles.flatlist}
            data={posts}
            keyExtractor={post => post.sender.toString()}
            renderItem={({ item }) => (
                <ListItem message={item.message} sender={item.sender} avatarUrl={item.avatarUrl} onRowSelected={onRowSelected} />
            )}
        >
        </FlatList>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
        flex: 1,
        backgroundColor: 'grey',
    },
    flatlist: {
        flex: 1,
    },
    listRow: {
        margin: 4,
        flexDirection: "row",
        height: 150,
        elevation: 5,
        borderRadius: 2,
        backgroundColor: "#ffffff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    userDetailsRow: {
        flexDirection: "row",
        height: 40,
        alignItems: 'flex-start',
        marginTop: 5
    },
    listRowImage: {
        margin: 10,
        resizeMode: "contain",
        height: 130,
        width: 130,
        borderRadius: 80
    },
    listRowTextContainer: {
        flex: 1,
        margin: 10,
        justifyContent: "space-around"
    },
    listRowName: {
        fontSize: 35,
        fontWeight: "bold"
    },
    listRowId: {
        fontSize: 25,
        color: "#8f8f8f"
    },
    profilePicture: {
        width: 45,
        height: 45,
        borderRadius: 80,
        marginEnd: 20
    },
    pinkBackground: {
        backgroundColor: "#ff69b4"
    },
    greyText: {
        color: "#8f8f8f"
    }
});



export default AllPostsPage