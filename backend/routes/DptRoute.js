import express from "express";
import {
    getDPT,
    getDPTById,
    createDpt,
    updateDpt,
    deleteDpt
} from '../controllers/Dpt.js'
import { verifyUser } from "../middleware/AuthUser.js";




const router = express.Router()

router.get('/dpt',verifyUser, getDPT)
router.get('/dpt/:id',verifyUser, getDPTById)
router.post('/dpt',verifyUser, createDpt)
router.patch('/dpt/:id',verifyUser, updateDpt)
router.delete('/dpt/:id',verifyUser, deleteDpt)


export default router;