import connectDB from "./db/index.js"
import dotenv from 'dotenv'
import express from 'express'

const app = express()

console.log("Application: start !!\n")
console.log("Database String is ", process.env.PORT)
console.log("Database String is ", process.env.DATABASE_URI)

dotenv.config({
    path: "./env"
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server running on PORT: ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log(`MongoDB connection failed  ${err}`)
})

