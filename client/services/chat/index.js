import axiosClient from "@services/axiosClient";

export const ChatService ={
    getChatList:  (id) => {
        const url ='/conversation/my-conversation'
        return axiosClient.get(url)
    }
}