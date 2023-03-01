import apiClient from "./ClientApi";

const uploadImage = async (image: any) => {
    return apiClient.post("/file/file", image)
}

const getUserById = async (userId:String) => {
    return apiClient.get("user/" + userId)
}

const addNewPost = async (postJson:any) => {
    return apiClient.post("post/" , postJson)
}

const getAllPosts = async () => {
    return apiClient.get("post/")
}

const upadteUser = async (userUpdatJson:any) => {
    return apiClient.put("user/",userUpdatJson)
}

export default {uploadImage, getUserById,addNewPost,getAllPosts,upadteUser};