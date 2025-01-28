import axios from "axios";

const axiosPublic=axios.create({
    // baseURL:"http://localhost:5000"
    baseURL:"https://front-end-blush-pi.vercel.app/api/v1/"
})
const useAxiosPublic = () => {
   return axiosPublic
};

export default useAxiosPublic;