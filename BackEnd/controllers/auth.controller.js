import mongoose from 'mongoose';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_EXPIRE, JWT_SECRET } from '../config/env.js';

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { firstName, lastName, email, password } = req.body;


        // Check if user already exists
        const existingUser = await User.findOne({ email }).session(session);
        if (existingUser){
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUsers = await User.create([{
            firstName,
            lastName,
            email,
            password: hashedPassword
        }], { session });

        const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET , { expiresIn: JWT_EXPIRE });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ success: true , message: 'User created successfully', data: {token , user: newUsers[0] } });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
        }

        const isPasswordValide = await bcrypt.compare(password, user.password);

        if (!isPasswordValide) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRE });

        res.status(200).json({ 
            success: true,
            message: 'User signed in successfully',
            data: { token, user }
        });
    } catch (error) {
        next(error);    
    }
};
export const signOut = async (req, res, next) => {
    console.log("signout controller");
};