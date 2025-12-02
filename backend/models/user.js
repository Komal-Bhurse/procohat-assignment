import mongoose from 'mongoose'
const { Schema } = mongoose;


const userSchema = new mongoose.Schema({
    admin_id:{
        type:String,
        required:true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["User", "Admin"],
        default: "User"
    },
    rejection_reason: {
        type: String,
        require: false,
        default: ""
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema);

export default User