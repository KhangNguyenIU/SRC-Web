import axiosClient from "@services/axiosClient";

export const ChatService ={
    getChatList:  (cookie) => {
        const url ='/conversation/my-conversation'
        return axiosClient.get(url,{
            headers: {
                cookie:cookie
            }
        })
    },
    createNewChat : (data)=>{
        const url ='/conversation/create'
        return axiosClient.post(url, JSON.stringify(data))
    }
}