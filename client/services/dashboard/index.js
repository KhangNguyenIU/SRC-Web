import axiosClient from "@services/axiosClient";

export const DashboardService ={
    getUserStats : ()=>{
        const url = '/dashboard/user-stat'
        return axiosClient.get(url)
    }
}