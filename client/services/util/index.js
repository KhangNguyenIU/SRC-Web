import axiosClient from "@services/axiosClient"

 const UtilService ={
    uploadImage :(formData)=>{
        const url ='/upload'
        return axiosClient.post(url,formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
    }
 }

 export default UtilService