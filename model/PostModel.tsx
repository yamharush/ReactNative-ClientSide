import PostApi from '../api/PostApi';
export interface Post {
    id: string;
    userId: string;
    message: string;
    image?: string;
    userImage?: string;
}

const addPost = async (post: Post) => {
    console.log('addPost');
    try {
        const res: any = PostApi.addPost(post);
        console.log(res.data);
    } catch (err) {
        console.log('add post fail: ' + err);
    }
};

const getAllPosts = async () => {
    console.log('getall posts()');
    const res: any = await PostApi.getAllPosts();
    console.log({ res });
    let data = Array<Post>();
    if (res.data) {
        res.data.forEach((obj: any) => {
            // console.log("element: " + obj._id)
            const st: Post = {
                userId: obj.sender,
                id: obj._id,
                message: obj.message,
                image: obj?.image || '',
                userImage: obj?.userImage || '',
            };
            data.push(st);
        });
    }
    console.log({ data });

    return data;
};

export default { getAllPosts, addPost };