import apiClient from './ClientApi';
import { Student } from '../model/StudentModel';
import { User } from '../model/UserModel';
import { getFromStorage } from '../services/asyncStorage.service';

const login = async (user: User) => {
    return apiClient.post('/auth/login', user);
};

const logout = async () => {
    const token = await getFromStorage('accessToken');
    return apiClient.get(
        '/auth/logout',
        {},
        {
            headers: { authorization: `Breaer ${token}` },
        }
    );
};

const register = async (user: User) => {
    console.log('user to send server', { user });

    return apiClient.post('/auth/register', user);
};

const getUserInfo = async () => {
    const token = await getFromStorage('accessToken');
    return apiClient.get(
        '/auth',
        {},
        {
            headers: { authorization: `Breaer ${token}` },
        }
    );
};

const updateUser = async (user: User) => {
    const token = await getFromStorage('accessToken');
    return apiClient.put('/auth', user, {
        headers: { authorization: `Breaer ${token}` },
    });
};

export default {
    login,
    register,
    getUserInfo,
    updateUser,
    logout,
};