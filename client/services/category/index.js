import axiosClient from "@services/axiosClient";

const CategoryService = {
    getAll: () => {
        const url = "/category";
        return axiosClient.get(url);
    }
}

export default CategoryService;