import FormData from "form-data";
import AuthApi from "../api/AuthApi";
import apiClient from "../api/ClientApi";
import UserApi from "../api/UserApi";

export type User = {
  email: String,
  name: String,
  password: String,
  avatarUrl: String
}

export type Post = {
  message: String,
  sender: String,
  avatarUrl: String
}

export type UserUpdate = {
  id: String,
  name: String,
  avatarUrl: String
}

const uploadImage = async (imageURI: String) => {
  var body = new FormData();
  body.append("file", { name: "name", type: "image/jpeg", uri: imageURI });
  try {
    const res = await UserApi.uploadImage(body);
    if (!res.ok) {
      console.log("save failed " + res.problem);
    } else {
      if(res.data){
        const d: any = res.data
        console.log("url: " + d.url)
        return d.url
      }
    }
  } catch (err) {
    console.log("save failed " + err);
  }
  return ""
};

const getUserById = async (id:string) =>{
  try{
    const res = await UserApi.getUserById(id);
    if(!res.ok) {
      console.log("fail getting user from db by ID");
    } else {
      if(res.data){
        const d: any = [res.data.name,res.data.avatarUrl]
        return d
      }
    }
  }catch(err) {
    console.log('fail getting user from db by ID ' + err)
  }
}

const addNewPost = async (post:Post)=>{
  const data = {
    message: post.message,
    sender: post.sender,
    avatarUrl: post.avatarUrl
  }
  try {
      const res = await UserApi.addNewPost(data)
      console.log('success add new post')
  } catch (err) {
      console.log("add new post failed: " + err)
  }
}

const getAllPosts = async () => {
  const res:any = await UserApi.getAllPosts()
  let d = Array<Post>()
  if (res.data) {
      res.data.forEach((obj: any) => {
        const s = obj.avatarUrl
          const p: Post = {
            message: obj.message,
            sender: obj.sender,
            avatarUrl: s
          }
          console.log(obj)
          console.log(p.sender)
          console.log(p.message)
          d.push(p)
      });
  }
  return d
}

const upadteUser = async (user_update:UserUpdate) => {
  const data = {
    id: user_update.id,
    name: user_update.name,
    avatarUrl: user_update.avatarUrl
  }

  try {
    const res:any = await UserApi.upadteUser(data)
    console.log('success update user')
  } catch (err) {
    console.log("update user failed: " + err)
  }
}


export default {uploadImage,getUserById,addNewPost,getAllPosts,upadteUser}