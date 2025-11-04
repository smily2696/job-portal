// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: {
        type: String, // Clerk ID
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    resume: {
        type: String,
        default: "",
    },
    image: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    }
    ,
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
