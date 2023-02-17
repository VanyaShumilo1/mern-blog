import jwt from "jsonwebtoken";
import config from "config";

export default (req, res, next) => {
    // postman
    // const token = (req.headers.authorization || '').split(' ')[1]

    //browser
    const token = req.headers.authorization
    if(token) {
        try {
            const decoded = jwt.verify(token, config.get('secretKey'))
            req.userId = decoded._id
            next()

        } catch (err) {
            res.status(500).json({
                message: "token verify error"
            })
        }
    } else {
        return res.status(403).json({
            message: "No accessssssssssss"
        })
    }

}