import axiosClient from "@services/axiosClient";

const FeedbackService ={

    getFeedbacks: ()=>{
        const url = '/feedback';
        return axiosClient.get(url);
    },
    createFeedback: (data)=>{
        const url = '/feedback/create';
        return axiosClient.post(url,JSON.stringify(data));
    },
    getFeedbackByUser : ()=>{
        const url = `/feedback/user`;
        return axiosClient.get(url);
    }
}

export default FeedbackService;