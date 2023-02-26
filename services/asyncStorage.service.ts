import AsyncStorage from '@react-native-async-storage/async-storage';

async function getFromStorage(key: string) {
    return await AsyncStorage.getItem(key);
}

async function saveToStorage(key: string, value: any) {
    await AsyncStorage.setItem(key, value);
}

async function clearStorage() {
    await AsyncStorage.clear();
}

export { getFromStorage, saveToStorage, clearStorage };