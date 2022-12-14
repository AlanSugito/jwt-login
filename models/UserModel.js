import { compare, genSalt, hash } from "bcrypt";
import {model, Schema} from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please Insert your username!"],
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please Insert your email!"],
        lowercase: true
    },
    password: {
        type: String,
        minlength: [6, "Minimum password length is 6!"],
        required: [true, 'Please Insert your password!']
    }
})

UserSchema.statics.Login = async function (email, password) {
    const user = await this.findOne({email})

    if(user) {
        const isMatch = await compare(password, user.password)

        if (isMatch) {
            return user
        }

        throw Error("Password is not valid")
    }

    throw Error('Email has not registered yet')
}

UserSchema.pre('save', async function (next) {
    const salt = await genSalt()
    this.password = await hash(this.password, salt)
    next()
})

export const User = model('pengguna', UserSchema)