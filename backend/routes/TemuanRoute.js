import express from 'express';
import {getTemuan, getTemuanbyId, createTemuan, updateTemuan, deleteTemuan, updateStatus} from '../controllers/Temuan.js'
import {verifyUser, adminOnly} from '../middleware/AuthUser.js'
// import { verifyUser } from '../middleware/AuthUser.js'

const router = express.Router()

router.get('/temuan',verifyUser,getTemuan)
router.get('/temuan/:id',verifyUser,getTemuanbyId)
router.post('/temuan',verifyUser, createTemuan)
router.patch('/temuan/:id',verifyUser, updateTemuan)
router.patch('/temuan/:id',verifyUser, updateStatus)
router.delete('/temuan/:id',verifyUser, deleteTemuan)

export default router;