import { Post } from '../model/PostModel';
import { getFromStorage } from '../services/asyncStorage.service';
import apiClient from './ClientApi';

const getAllPosts = async () => {
    const token = await getFromStorage('accessToken');
    return apiClient.get(
        '/post',
        {},
        {
            headers: { authorization: `Breaer ${token}` },
        }
    );
};

const addPost = async (post: Post) => {
    try {
        const token = await getFromStorage('accessToken');
        return apiClient.post('/post', post, {
            headers: { authorization: `Breaer ${token}` },
        });
    } catch (err) {
        console.log(err);
    }
};

const uploadImage = async (image: any) => {
    return apiClient.post('/file/file', image);
};

export default {
    getAllPosts,
    addPost,
    uploadImage,
};