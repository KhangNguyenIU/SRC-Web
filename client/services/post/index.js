import axiosClient from "@services/axiosClient";

const PostService ={
    createPost : (data)=>{
        const url = '/post/create';
        return axiosClient.post(url, JSON.stringify(data));
    },
    getPostList: (limit=5, page=1,search="")=>{
        let prefix =''

        if (!limit && !page) prefix = ''
        else if(limit && page) prefix = `?limit=${limit}&page=${page}`
        else if(limit && ! page) prefix = `?limit=${limit}`
        else if (!limit && page) prefix = `?page=${page}`

        const url ='/post'+prefix;
        return axiosClient.get(url);
    },
    getPostBySlug: (slug)=>{
        const url = `/post/get-by-slug/${slug}`;
        return axiosClient.get(url);
    },
    getPostByCateSlug: (slug, data={})=>{
        console.log(data)
        const url =`/post/get-by-category-slug/${slug}`;
        return axiosClient.post(url, JSON.stringify(data));
    }
}

export default PostService;