import axios from "axios"

export const indivisualPost = async(userId) => {

    try {
        const result = await axios.get(`/api/post/postbyuserid/${userId}`)
        if (result) {
            return result.data.data
        }
    } catch (err) {
        console.log("indivisual post Api: ", err.message)
    }

}