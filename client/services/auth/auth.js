import axiosClient from "@services/axiosClient"

const authService = {
    login: (data) => {
        const url = '/user/signup'
        return axiosClient.post(url, JSON.stringify(data))
    },

    checkAuth: () => {
        const url = '/user/auth'
        return axiosClient.post(url)
    }
}

export default authService