import AuthApi from "../api/AuthApi";
import apiClient from "../api/ClientApi";

export type User = {
    email: String,
    name: String,
    password: String,
    avatarUrl: String
}

export type Token = {
    refreshtoken: string,
}

type UserInfo = {
    accessToken: string;
    refreshToken: string;
    id: string;
};

const register = async (user: User) => {
    const data = {
      email: user.email,
      name: user.name,
      password: user.password,
      avatarUrl: user.avatarUrl
    }
    try {
        const res = await AuthApi.register(data)
        console.log('success signup authmodel')
    } catch (err) {
        console.log("register failed: " + err)
    }
}

const login = async (user: User): Promise<string | UserInfo | any> => {
    const d = {
      email: user.email,
      name: user.name,
      password: user.password,
      avatarUrl: user.avatarUrl
    };
    try {
      const res = await AuthApi.login(d);
      const data: UserInfo | any = res.data;
      if (typeof data.id === 'undefined') {
        console.log('data err');
        return data.id as string;
      } else {
        const { accessToken, id, refreshToken } = data;
        const userRes = [accessToken, id, refreshToken];
        console.log('good data');
        return userRes;
      }
    } catch (err) {
      console.log('login failed:', err);
      throw err;
    }
  };

  const logout = async (): Promise<void> => {
    console.log("logout");
    await AuthApi.logout();
  };

export default {register, login, logout}