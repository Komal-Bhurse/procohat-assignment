import mongoose from 'mongoose'
const { Schema } = mongoose;

const documentSchema = new mongoose.Schema({
    admin_id:{
        type:String,
        required:true
    },
    user: {
        type: Object,
        required: true,
        user_id: {
            type: String,
            required: true
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
            required: true
        },
    },
    document_name: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    }

}, { timestamps: true })

const Document = mongoose.model('Document', documentSchema);

export default Document