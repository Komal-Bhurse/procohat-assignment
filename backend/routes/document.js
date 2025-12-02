import express from 'express'
import {isAdmin, isUser} from '../middlewares/user.js'

import { addMultipleDocument, updateDocumentStatusToApproved, updateDocumentStatusToRejected, getAllDocument, getUserDocuments } from '../controllers/document.js'

const router = express.Router()

router.post('/add/multiple',isAdmin, addMultipleDocument)

router.put('/status/approve/:id',isAdmin, updateDocumentStatusToApproved)

router.put('/status/reject/:id',isAdmin, updateDocumentStatusToRejected)

router.get('/all',isAdmin, getAllDocument)

router.get('/get-user-documents',isUser, getUserDocuments)

export default router;

