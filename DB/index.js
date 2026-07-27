import mongoose from "mongoose";

const dbConnect = async() => {
    try { 
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}/CareerCopilot`)
        console.log(`Database is connected : ${connectionInstance.connection.host} !!!`);
        return connectionInstance; 
    } catch (err) {
        console.log("Failed to connect due to database error!", err)
        throw err;
    }
}

export default dbConnect;