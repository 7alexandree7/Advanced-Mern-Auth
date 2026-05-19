import jwt from 'jsonwebtoken';
import { ENV_VARIABLES } from "../config/env.js";


export const verifyToken = (req, res, next) => {

    const token = req.cookies.token;

    try {
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        const decoded = jwt.verify(token, ENV_VARIABLES.JWT_SECRET);
        if (!decoded || !decoded.userId) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }

}