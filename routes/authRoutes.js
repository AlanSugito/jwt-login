import {Router} from 'express'
import { login_post } from '../controller/loginController.js'
import { signup_post } from '../controller/signupController.js'

export const router = Router()

router.get('/signup', (req, res) => res.render('signup'))
router.post('/signup', signup_post)

router.get('/login', (req, res) => res.render('login'))
router.post("/login", login_post)