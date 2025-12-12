import api from "./api";

export const getProfile = async () =>{
    try{
        const response = await api.get('/profile');
        return response.data;
    }catch(error){
        console.error("error fetching profile:",error);
        throw error;
    }
};
