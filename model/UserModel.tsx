import AuthApi from '../api/AuthApi';
export interface User {
    // id:string;
    name: string;
    email: string;
    password: string;
    image?: string;
}

const login = async (user: User) => {
    console.log('login');
    const res: any = await AuthApi.login(user);
    return res.data;
};

const register = async (user: User) => {
    console.log('register');
    return await AuthApi.register(user);
};

const getUserInfo = async () => {
    console.log('getUserInfo');
    return await AuthApi.getUserInfo();
};

const updateUser = async (user: User) => {
    console.log('updateUser');
    return await AuthApi.updateUser(user);
};

const logout = async () => {
    console.log('logout');
    return await AuthApi.logout();
};

export default { register, login, getUserInfo, updateUser, logout };