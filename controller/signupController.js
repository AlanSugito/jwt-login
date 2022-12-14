import { User } from "../models/UserModel.js"
import { errorHandler } from "../utils/errorHandling.js"

export const signup_post = async (req, res) => {
    const { username, email, password} = req.body

    try {
        const user = await User.create({username, email, password})
        res.status(200).json({message: "User Succesfully Created", data: user})

    } catch (err) {
       const errors = errorHandler(err)
       res.status(400).json({errors})
    }


}