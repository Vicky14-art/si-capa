import { response } from "express";
import Dpt from "../models/DptModels.js";
import Users from "../models/UserModel.js";

export const getDPT = async(req , res) => {
    try {
        let response
        if (req.role == 'admin') {
            response = await Dpt.findAll({
                attributes:["name","initial", "uuid"],
                include:[{
                    model:Users,
                    attributes:["name","email"]
                }]
            })
        }else{
            response = await Dpt.findAll({
                where:{
                    id:req.dptId
                },
                attributes:["name","initial", "uuid"],
                include:[{
                    model:Users,
                    attributes:["name", "email"]
                }]
            })
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({
            msg:error.message
        })
    }
    
}

export const getDPTById = async(req, res) => {
    try {
        const response = await Dpt.findOne({
            where:{
                uuid:req.params.id
            },
            attributes:["name", "initial"]
        })
        if (!response) return res.status(404).json({
            mag:"Dpt Tidak Ditemukan"
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({
            msg:error.message
        })
    }
}

export const createDpt = async(req , res) => {
    const {name, initial} = req.body;

    try {
        if (req.role === 'admin') {
            await Dpt.create({
                name:name,
                initial:initial
            })
        }
        if (req.role === "user") return res.status(404).json({
            msg:"Anda bukan admin"
        })
        res.status(200).json({
            msg:"Departement Berhasil ditambahkan"
        })
    } catch (error) {
        res.status(500).json({
            msg:error.message
        })
    }
}

export const updateDpt = async(req , res) => {
    
    try {
        const uuid = req.params.id
        const response = await Dpt.findOne({
            where:{
                uuid:uuid
            }
        })
        if(!response) return res.status(400).json({
            msg:"Dpt Tidak Ditemukan"
        })
        
        const {name, initial} = req.body;
        const productId = response.id
        if (req.role === 'admin') {
            await Dpt.update(
                {
                    name:name,
                    initial:initial
                },
                {
                    where:{
                        id:productId
                    }
                }
            )
        }
        if (req.role === "user") return res.status(404).json({
            msg:"Anda bukan admin"
        })
        res.status(200).json({
            msg:"Dpt Berhasil di Update"
        })
    } catch (error) {
        res.status(500).json({
            msg:error.message
        })
    }
}


export const deleteDpt = async(req , res) => {
    const uuid = req.params.id
    try {
        let dptId
        if (req.role === 'admin') {
            const response = await Dpt.destroy({
                where:{
                    uuid:uuid
                }
            })
            dptId = response.id
            if (!response) return res.status(400).json({
                msg:"Dpt Tidak Ditemukan"
            })
        }else if (req.role !== 'admin') return res.status(404).json({
            msg:"Anda Bukan Admin"
        })
        res.status(200).json({
            msg:"Dpt Berhasil Dihapus"
        })
    } catch (error) {
        res.status(500).json({
            msg:error.message
        })
    }

}
