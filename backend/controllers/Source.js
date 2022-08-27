import Source from "../models/SumberCapa.js";


export const getSource = async(req , res) => {
    try {
        const response = await Source.findAll()
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