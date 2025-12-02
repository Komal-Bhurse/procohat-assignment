
import Document from '../models/document.js'

export const addMultipleDocument = async (req, res) => {
    try {

        const {_id} = req.user;

        const {document_name,users} = req.body

        if (!document_name && users.length === 0) {
            return res.status(404).json({ status: false, data: "", message: "Please fill all the details" })
        }

        // Find the maximum order number in the database
        const maxOrderDocument = await Document.findOne().sort({ order: -1 })
        const currentOrder = maxOrderDocument ? maxOrderDocument.order + 1 : 1

        // All documents in this batch will have the same order number
        const documentsArray = users.map((user)=>{
            return {
                admin_id:_id,
                user,
                document_name,
                status: "Pending",
                order: currentOrder
            }
        })  

        const documents = await Document.insertMany(documentsArray)

        if (!documents) {
            return res.status(505).json({ status: false, data: "", message: "server message" })
        }

        return res.status(201).json({ status: true, data: documents, message: "document added" })

    } catch (message) {
        return res.status(505).json({ status: false, data: "", message: message })
    }
}

export const updateDocumentStatusToApproved = async (req, res) => {
    try {
        const {_id} = req.user;
        const status = "Approved"   
        const id = req.params.id

        const document = await Document.findOneAndUpdate({admin_id:_id, _id: id }, { status: status }, { new: true })

        if (!document) {
            return res.status(505).json({ status: false, data: "", message: "Server Error" })
        }

        return res.status(201).json({ status: true, data: document, message: "document Updated" })

    } catch (error) {
        return res.status(505).json({ status: false, data: "", message: error })
    }
}

export const updateDocumentStatusToRejected = async (req, res) => {
    try {
        const {_id} = req.user;
        const status = "Rejected"
        const id = req.params.id

        const document = await Document.findOneAndUpdate({admin_id:_id, _id: id }, { status: status }, { new: true })

        if (!document) {
            return res.status(505).json({ status: false, data: "", message: "Server Error" })
        }

        return res.status(201).json({ status: true, data: document, message: "document Updated" })
    }
    catch (error) {
        return res.status(505).json({ status: false, data: "", message: error })
    }
}

export const getAllDocument = async (req, res) => {
    try {
        const {_id} = req.user;
        const document = await Document.find({admin_id:_id})

        if (!document) {
            return res.status(505).json({ status: false, data: "", message: "Server Error" })
        }

        return res.status(200).json({ status: true, data: document, message: "success" })

    } catch (error) {
        return res.status(505).json({ status: false, data: "", message: error })
    }
}

export const getUserDocuments = async (req, res) => {
    try {
        const {_id} = req.user;

        const documents = await Document.find({"user.user_id":_id})

        if (!documents) {
            return res.status(505).json({ status: false, data: "", message: "Server Error" })
        }

        return res.status(200).json({ status: true, data: documents, message: "success" })

    } catch (error) {
        return res.status(505).json({ status: false, data: "", message: error })
    }
}

