import mongoose from "mongoose";
import { DB_URI } from '../config/env.js';

if(!DB_URI){
    throw new Error('Please define the MONGODB_URI in the environment variable inside .env')
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log('connect to database')
    } catch (error) {
        console.error('Errec connecting to Database : ' , error);
        process.exit(1)
        
    }
}


export default connectToDatabase;