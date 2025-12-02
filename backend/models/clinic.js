import mongoose from 'mongoose'
const { Schema } = mongoose;

const clinicSchema = new mongoose.Schema({
    clinic_name: {
        type: String,
        required: true
    },
    doctor_name: {
        type: String,
        required: true
    },
    clinic_email: {
        type: String,
        required: true
    },
    clinic_number: {
        type: String,
        required: true
    },
    establishment_date: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    panchakrma: {
        type: String,
        required: true
    },
    number_of_patient: {
        type: String,
        required: false,
        default: ""
    },
    revenue: {
        type: String,
        required: false,
        default: ""
    },
    status: {
        type: String,
        enum: ["New"],
        default: "New"
    }

}, { timestamps: true })

const Clinic = mongoose.model('Clinic', clinicSchema);

export default Clinic