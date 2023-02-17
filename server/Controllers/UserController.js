import UserModel from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";

export const register = async (req, res) => {
    try {
        const {email, password, fullName, avatarUrl} = req.body

        const candidate = await UserModel.findOne({email})

        if (candidate) {
            console.log(`User with email ${email} already exist`)
            return res.status(400).json({message: `User with email ${email} already exist`})
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = await UserModel.create({
            email,
            passwordHash: hashPassword,
            fullName,
            avatarUrl,
        })

        const token = jwt.sign({
            _id: user._id
        }, config.get('secretKey'), {expiresIn: '30d'})

        const {passwordHash, ...userData} = user._doc;

        res.status(200).json({...userData, token})
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Can't register"
        })
    }
}

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email})
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user._doc.passwordHash)

        if(!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid login or password"
            })
        }

        const token = jwt.sign({
            _id: user._id
        }, config.get('secretKey'), {expiresIn: '30d'})

        const {passwordHash, ...userData} = user._doc;

        res.status(200).json({...userData, token})

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Can't login"
        })
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findOne({_id: req.userId})

        if(!user) {
            return res.status(404).json({
                message: "user not found"
            })
        }

        const {passwordHash, ...userData} = user._doc;
        res.status(200).json({...userData})
    } catch (err) {
        console.log(err)
    }
}