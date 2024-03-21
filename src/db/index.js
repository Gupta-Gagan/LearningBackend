import mongoose from "mongoose"
import {DB_NAME} from "../constant.js"

const connectDB = async () => {
    try{
        const connectionInsance = await mongoose.connect(`${process.env.DATABASE_URI}/${DB_NAME}`)
        console.log(`MongoDB Connected Successfully !! DB Host: ${connectionInsance.connection.host}`)
    }
    catch(error){
        console.log("MongoDB Connection Failed !! Error is ",error)
        process.exit(1)
    }
}

export default connectDB 