import apiClient from "./ClientApi"
import AsyncStorage from '@react-native-async-storage/async-storage';
const register = async (userJson: any) => {
    return apiClient.post("auth/register", userJson)
} 

const login = async (userJson: any) => {
    return apiClient.post("auth/login", userJson)
}

const logout = async (): Promise<void> => {
    const token = await AsyncStorage.getItem("accessToken");
    await apiClient.get<void>("/auth/logout", {}, {
      headers: { authorization: `Bearer ${token}` },
    });
    await AsyncStorage.clear();
    console.log("Logged out");
  };


export default {
    register,
    login,
    logout,
}