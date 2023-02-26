import { FC, useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Button,
    TextInput,
} from 'react-native';
import UserModel, { User } from '../model/UserModel';
import { clearStorage } from '../services/asyncStorage.service';
export const InfoScreen: FC<{
    route: any;
    navigation: any;
    user: User;
    loadUser: any;
}> = ({ route, navigation, user, loadUser }) => {
    useEffect(() => {
        console.log('InfoScreen', { user });
    }, []);

    const [edit, setEdit] = useState<boolean>(false);
    const [email, setEmail] = useState<string>(user.email);
    const [name, setName] = useState<string>(user.name);

    const handleSubmit = async () => {
        if (edit) {
            const updatedUser: any = await UserModel.updateUser({
                ...user,
                email,
                name,
            });
            console.log('data after  update:', updatedUser.data);
            setEdit(false);
            if (!updatedUser.data.err) {
                setEmail(updatedUser.data.email);
                setName(updatedUser.data.name);
            }
        } else {
            setEdit(true);
        }
    };

    function onLogout() {
        console.log('ggg');
        UserModel.logout();
        clearStorage();
        loadUser();
    }

    return (
        <View style={{ flex: 1 }}>
            <View>
                {!user.image && (
                    <Image
                        source={require('../assets/avatar.png')}
                        style={styles.avatar}
                    ></Image>
                )}
                {user.image && (
                    <Image source={{ uri: user.image }} style={styles.avatar}></Image>
                )}
            </View>
            <View style={{ width: '80%', alignSelf: 'center' }}>
                {!edit && <Text style={{ marginBottom: 15 }}>Email:{email}</Text>}
                {!edit && <Text style={{ marginBottom: 15 }}>Name:{name}</Text>}
                {edit && (
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        placeholder={'Message'}
                    />
                )}
                {edit && (
                    <TextInput
                        style={styles.input}
                        onChangeText={setName}
                        value={name}
                        placeholder={'Message'}
                    />
                )}
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>{edit ? 'Save' : 'Edit'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => onLogout()}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatar: {
        height: 250,
        resizeMode: 'contain',
        alignSelf: 'center',
        width: '100%',
    },
    cameraButton: {
        position: 'absolute',
        bottom: -10,
        left: 10,
        width: 50,
        height: 50,
    },
    galleryButton: {
        position: 'absolute',
        bottom: -10,
        right: 10,
        width: 50,
        height: 50,
    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    buttonesContainer: {
        flexDirection: 'row',
    },
    button: {
        margin: 12,
        padding: 12,
        backgroundColor: 'blue',
        borderRadius: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
    },
});