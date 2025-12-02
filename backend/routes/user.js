import express from 'express'
import {isAdmin, isUser} from '../middlewares/user.js'
import { addUser, getPendingUser, getApprovedUser,getRejectedUser ,updateUserStatusToApproved,updateUserStatusToRejected, getTotalUserCount, getPendingUserCount, userLogin, adminLogin, userLogout, adminLogout} from '../controllers/user.js'

const router = express.Router()

router.post('/add',isAdmin,addUser)

router.get('/all/pending',isAdmin, getPendingUser)

router.get('/all/approved',isAdmin, getApprovedUser)

router.get('/all/rejected',isAdmin, getRejectedUser)

router.put('/status/approve/:id',isAdmin, updateUserStatusToApproved)

router.put('/status/reject/:id',isAdmin, updateUserStatusToRejected)

router.get('/count/all',isAdmin, getTotalUserCount)

router.get('/count/pending',isAdmin, getPendingUserCount)

router.post('/user-login', userLogin)

router.post('/admin-login', adminLogin)

router.post('/user-logout',isUser, userLogout)

router.post('/admin-logout',isAdmin, adminLogout)

export default router;

