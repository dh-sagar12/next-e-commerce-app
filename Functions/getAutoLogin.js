import axios from "axios"

const handleRefreshToken = async () => {
    const siteURL   =  process.env.SITE_URL
    try {
   const response  =  await  axios.get(`${siteURL}/api/auth/refresh/`)
    return response.data
    }catch(err){
        if (err.response.status == 401){
            return  err.response.data
        }
        else{
            return {'error': 'INTERNAL SERVER ERROR', status: 500}
        }
    }
   
}

export default handleRefreshToken;