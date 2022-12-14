import jwt from "jsonwebtoken"
import { User } from "../models/UserModel.js"

export const authorize = async (req, res, next) => {
    const { token } = req.cookies

    if(token) {
        jwt.verify(token, 'rahasia bro!', (err, decodedToken) => {
            if (err) {
                res.status(301)
                res.redirect('/login')
                
            } else {
                next()
            }

        })
    } else {
        res.status(301)
        res.redirect('/login')

    }

} 

export const checkUser =  (req, res, next) => {
    const { token } = req.cookies

    if (token) {
        jwt.verify(token, 'rahasia bro!', async (err, decodedToken) => {
            if (err) {
                next()
            } else {
                const user = await User.findById(decodedToken.id)
                res.locals.user = user
                next()
            }
        })
    } else {
        next()
    }
}