import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = mongoose.Schema(
        {
            username: {
                type: String,
                required: true,
                lowercase: true,
                unique: true,
                trim: true,
                index: true
            },
            email: {
                type: String,
                required: true,
                lowercase: true,
                unique: true,
                trim: true,
            },
            fullName: {
                type: String,
                required: true,
                trim: true,
                index: true
            },
            avatar: {
                type: String,   //Cloudinary URL
                required: true
            },
            coverImage: {
                type: String
            },
            password: {
                type: String,
                required: [true, "Password is Required.."]
            },
            watchHistory: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Video"
            },
            refreshToken:{
                type: String
            }
            
        },
        {
            timestamps: true
        }
    )

    userSchema.pre("save", async function(next){
        if(!this.isModified("password"))  return next()
        this.password = bcrypt.hash(this.password, 10)
        next()
    })

    userSchema.methods.isPasswordCorrect = async function(password){
        return await bcrypt.compare(password, this.password)
    }

    userSchema.methods.generateAccessToken = function(){
        return jwt.sign({
            _id: this._id,
            email: this.email,
            fullname: this.fullName,
            username: this.username
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        })
    }

    userSchema.methods.generateRefreshToken = async function(){
        return jwt.sign({
            _id: this._id,
            email: this.email,
           
        }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        })
    }



export const User = mongoose.model("User", userSchema)