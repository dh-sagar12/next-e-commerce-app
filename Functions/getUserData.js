import axios from "axios";


const siteURL   =  process.env.SITE_URL

const getUserData = async () => {
    try {

        let   response =  await axios.get(`/api/auth/user/`);
        return response.data
    }
    catch (error) {
        return error
    }
}




const getUserCart  =  async  () =>{
    try {
        let response    = await axios.get(`${siteURL}/api/user/cart`)
        return response.data
    } catch (error) {
        return error
    }
}

export default getUserData
export  {getUserCart}

