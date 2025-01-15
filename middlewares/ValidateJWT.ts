import { response, request } from 'express'
import jwt from 'jsonwebtoken'
const {verify} = jwt
import {config} from 'dotenv'
config()

export const  validateJWT = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            status: 'FAILED',
            data: {
                error: 'You do not have any token'
            }
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({
                msg: 'Token not valid - user does not exist in DB'
            });
        }
        
        req.tokenPayload = decoded;

        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({
            status: 'Authentication error',
            error: 'Token authentication error',
            message: error.message
        });
    }
};