import jwt from "jsonwebtoken"


const createToken = (id) => {
    const secret = "rahasia bro!"
    const token = jwt.sign({id}, secret, {expiresIn: "10 days"})
    return token
}

export default createToken