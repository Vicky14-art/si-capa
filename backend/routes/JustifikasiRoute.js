import express from 'express';
import {
getJustifikasi
} from "../controllers/Justifikasi.js"
// import { verifyUser } from '../middleware/AuthUser.js'

const router = express.Router()

router.get('/source',getJustifikasi)

export default router;