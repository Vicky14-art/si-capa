import express from 'express';
import {getSource} from '../controllers/Source.js';
// import { verifyUser } from '../middleware/AuthUser.js'

const router = express.Router()

router.get('/source',getSource)

export default router;