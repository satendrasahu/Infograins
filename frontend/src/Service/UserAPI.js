import axios from "axios"

export const UserDataByUserId = async(userId) => {

    try {
        const result = await axios.get(`/api/auth/user/${userId}`)
        if (result) {
            return result.data.data;
        }
    } catch (err) { console.log("USER API ERROR : ", err.message) }

}