import Justifikasi from "../models/JustifikasiModels.js";

export const getJustifikasi = async(req , res) => {
    try {
        const response = await Justifikasi.findAll()
        if(!response) return res.status(404).json({
            msg:"Tidak Ditemukan"
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({
            msg:error.message
        })
    }
    
}