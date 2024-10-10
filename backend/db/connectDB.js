import mongoose from 'mongoose'

export const connectDB = async () => {
    try{
        console.log();
        const conn = await mongoose.connect(process.env.MONGO_URL);
        // console.log(`MongoDB connected ${conn.connection.host}`);
    }catch(error){
        console.log("Error connection to mongoDB: ", error.message);
        process.exit(1); // 1 status code is failure, 0 status code is success
    }
}