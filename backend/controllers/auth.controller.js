import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { generateVerificationToken } from '../utils/generateverificationToken.js';
import { generatetokenAndSetCookie } from '../utils/generatetokenAndSetCookie.js';
import { userNotPassword } from '../utils/userNotPassword.js';
import { sendResetPasswordEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from '../mail/email.js';
import { ENV_VARIABLES } from '../config/env.js';


export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            throw new Error('All fields are required');
        }

        const userAlreaduExists = await User.findOne({ email });
        if (userAlreaduExists) {
            return res.status(400).json({ succes: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = generateVerificationToken();

        const user = await new User({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // Set token to expire in 24 hours
        });

        await user.save();
        generatetokenAndSetCookie(res, user._id);
        await sendVerificationEmail(user.email, verificationToken);


        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: userNotPassword(user)
        });


    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
        console.log(error);
    }
}



export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        const isPasswordIsValid = await bcrypt.compare(password, user.password);
        if (!isPasswordIsValid) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        generatetokenAndSetCookie(res, user._id);
        user.lastLogin = new Date();
        await user.save();
        
        res.status(200).json({ success: true, message: "Logged in successfully", data: userNotPassword(user) });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}



export const logout = async (req, res) => {
    res.clearCookie('token')
    res.status(200).json({ success: true, message: "Logged out successfully" });
}



export const verifyEmail = async (req, res) => {

    const { code } = req.body;

    try {
        const user = await User.findOne({ verificationToken: code, verificationTokenExpiresAt: { $gt: Date.now() } });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired verification token" });
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name);
        res.status(200).json({ success: true, message: "Email verified successfully", data: userNotPassword(user) });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
        console.log(error);
    }
}



export const forgotPassword = async (req, res) => {
    const { email} = req.body;

    try {
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ success: false, message: "User with this email does not exist" });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // Set token to expire in 1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;
        
        await user.save();

        // Send reset password email
        await sendResetPasswordEmail(user.email, `${ENV_VARIABLES.CLIENT_URL}/reset-password/${resetToken}`);
        res.status(200).json({ success: true, message: "Password reset email sent successfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }

}


export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        const user = await User.findOne( { resetPasswordToken: token, resetPasswordExpiresAt: { $gt: Date.now() } } );
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        await sendResetSuccessEmail(user.email);

        res.status(200).json({ success: true, message: "Password reset successfully" });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
        console.log(error);
    }
}

