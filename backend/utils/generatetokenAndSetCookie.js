import jwt from "jsonwebtoken";
import { ENV_VARIABLES } from "../config/env.js";

export const generatetokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({userId}, ENV_VARIABLES.JWT_SECRET, { expiresIn: '7d' });
    res.cookie("token", token, {
        httpOnly: true,
        secure: ENV_VARIABLES.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    return token
}