import express from "express";
import cookieParser from "cookie-parser";
import { router } from "./routes/authRoutes.js";
import mongoose from "mongoose";
import { authorize, checkUser } from "./middleware/authMiddleware.js";

const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())


app.set('view engine', 'ejs')

app.use('*', checkUser)
app.get('/', authorize, (req, res) => res.render('home'))
app.use(router)


mongoose.connect('mongodb+srv://alansugito:Katakato02@clusterlearn.aukswtn.mongodb.net/?retryWrites=true&w=majority', () => {
    console.log("connected")
})


app.listen(5000, () => {
    console.log('ready')
})


