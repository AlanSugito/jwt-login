import { User } from "../models/UserModel.js"
import createToken from "../utils/createToken.js"
import { errorHandler } from "../utils/errorHandling.js"

export const login_post = async (req, res) => {
    const { email, password} = req.body

    try {
        const user = await User.Login(email, password)
        const token = createToken(user._id)
        res.cookie('token', token, {maxAge: 60 * 60 * 24 * 1000, httpOnly: true}, )
        res.status(200).json({message: "Login Succes"})
    } catch (err) {
        const errors = errorHandler(err)
        res.status(400).json({errors})
    }
}