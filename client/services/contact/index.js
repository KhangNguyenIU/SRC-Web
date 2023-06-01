import axiosClient from "@services/axiosClient";
import {cache} from 'react'

export const ContactService ={
    getContacts: () => {
        const url ='/faculty'
        return axiosClient.get(url)
    }
}