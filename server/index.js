import express from 'express'
import config from 'config'
import mongoose from "mongoose"
import {loginValidation, postCreateValidation, registerValidation} from "./validations.js"
import checkAuth from "./utils/checkAuth.js";
import * as UserController from './Controllers/UserController.js'
import * as PostController from './Controllers/PostController.js'
import multer from 'multer'
import handleValidationErrors from "./utils/handleValidationErrors.js";
import cors from 'cors'

const app = express()

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage})

const PORT = config.get('serverPort')

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.post("/auth/register", registerValidation, handleValidationErrors, UserController.register)
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})

app.get('/tags', PostController.getLastTags)
app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, PostController.create)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, postCreateValidation, PostController.update)

const start = async () => {
    try {
        await mongoose.connect(config.get("DB_URL")).then(() => console.log("\nDB CONNECTED"))
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }
}

start()