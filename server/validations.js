import {body} from 'express-validator'

export const loginValidation = [
    body('email', 'Invalid email').isEmail(),
    body('password', 'password length must be of 5-15 characters').isLength({min: 5, max: 15}),
]

export const registerValidation = [
    body('email', 'Invalid email').isEmail(),
    body('password', 'password length must be of 5-15 characters').isLength({min: 5, max: 15}),
    body('fullName', 'Invalid name').isLength({min: 3}),
    body('avatarUrl', 'Invalid avatar url').optional().isURL()
]

export const postCreateValidation = [
    body('title', 'Invalid title').isLength({min: 3}).isString(),
    body('text', 'Invalid post text (min length 10 characters)').isLength({min: 10}),
    body('tags', 'Invalid tags format (enter an array)').isLength({min: 3}).isString(),
    body('imageUrl', 'Invalid image url').optional().isString()
]