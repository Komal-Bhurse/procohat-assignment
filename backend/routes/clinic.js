import express from 'express'
import { addClinic, updateClinic, deleteClinic, getAllClinic } from '../controllers/clinic.js'

const router = express.Router()

router.post('/add', addClinic)

router.put('/update/:id', updateClinic)

router.delete('/delete/:id', deleteClinic)

router.get('/all', getAllClinic)

export default router;

