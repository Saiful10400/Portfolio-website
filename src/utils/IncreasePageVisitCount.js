import axios from "axios"

 

const increasePageCount=async(pageName)=>{
const data=await axios.post(`https://front-end-blush-pi.vercel.app/api/v1/all/visit/create?page=${pageName}`)
return data.data
}


export default increasePageCount