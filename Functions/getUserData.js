import axios from "axios";



const getUserData = async () => {
    try {

        const  response =  await axios.get(`/api/auth/user/`);
        return response.data
    }
    catch (error) {
        return error
    }
}

export default getUserData




