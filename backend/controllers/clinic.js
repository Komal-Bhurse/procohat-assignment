
import Clinic from '../models/clinic.js'

export const addClinic = async (req, res) => {
    try {
        const {
            clinic_name,
            doctor_name,
            clinic_email,
            clinic_number,
            establishment_date,
            location,
            panchakrma,
        } = req.body

        if (!
            clinic_name && !
            doctor_name && !
            clinic_email && !
            clinic_number && !
            establishment_date && !
            location && !
            panchakrma
        ) {
            return res.status(404).json({ status: false, data: "", message: "Please fill all the details" })
        }


        const obj = {
            clinic_name,
            doctor_name,
            clinic_email,
            clinic_number,
            establishment_date,
            location,
            panchakrma,
        }

        const clinic = await Clinic.create(obj)

        if (!clinic) {
            return res.status(505).json({ status: false, data: "", message: "server message" })
        }

        return res.status(201).json({ status: true, data: clinic, message: "clinic added" })

    } catch (message) {
        return res.status(505).json({ status: false, data: "", message: message })
    }
}

export const updateClinic = async (req, res) => {
    try {
        const data = req.body
        const id = req.params.id

        const clinic = await Clinic.findOneAndUpdate({ _id: id }, { ...data }, { new: true })

        if (!clinic) {
            return res.status(505).json({ status: false, data: "", message: "Server Error" })
        }

        return res.status(201).json({ status: true, data: clinic, message: "clinic Updated" })

    } catch (error) {
        return res.status(505).json({ status: false, data: "", message: error })
    }
}

export const deleteClinic = async (req, res) => {
    try {

        const id = req.params.id

        const clinic = await Clinic.findOneAndDelete({ _id: id })

        if (!clinic) {
            return res.status(505).json({ status: false, data: "", message: "Server Error" })
        }

        return res.status(201).json({ status: true, data: "", message: "clinic deleted" })

    } catch (error) {
        return res.status(505).json({ status: false, data: "", message: error })
    }
}

export const getAllClinic = async (req, res) => {
    try {
        const clinic = await Clinic.find()

        if (!clinic) {
            return res.status(505).json({ status: false, data: "", message: "Server Error" })
        }

        return res.status(200).json({ status: true, data: clinic, message: "success" })

    } catch (error) {
        return res.status(505).json({ status: false, data: "", message: error })
    }
}

