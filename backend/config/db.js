import mongoose from "mongoose";
export const connectDB = async ()=> {
    try{
        const conn = await mongoose.connect('mongodb://127.0.0.1/products-db');
        console.log(`Mongo DB connected: ${conn.connection.host}`);
    } catch(error){
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

// module.exports = connectDB;
