import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';


export const signup = async (req, res) => {
   const { name, email, password } =  req.body; 
   try {
    if(!name || !email || !password) {
        throw new Error('All fields are required');
    }

    const userAlreaduExists = await User.findOne({ email });
    if(userAlreaduExists) {
        return res.status(400).json({succes: false, message: "User already exists"});
    }

    const hashedPassword = await bcrypt.hashSync(password, 10);
    const user = await new User({
        name,
        email,
        password: hashedPassword
    });

    await user.save();
    res.status(201).json({ success: true, message: "User created successfully" });


   } catch (error) {
    res.status(400).json({ success: false, message: error.message });
    console.log(error);
   }
}



export const login = async (req, res) => {
    res.send('login route');
}


export const logout = async (req, res) => {
    res.send('logout route');
}