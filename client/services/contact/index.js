import axiosClient from "@services/axiosClient";


export const ContactService ={
    getContacts: () => {
        const url ='/faculty'
        return axiosClient.get(url)
    }
}