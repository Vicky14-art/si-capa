import { response } from "express";
import Source from "../models/SumberCapa.js";
import {Op, where} from "sequelize";
import {Users, Temuan, Dpt, Justifikasi} from '../models/index.js'


export const getTemuan = async(req , res) => {
    try {
        const response = await Temuan.findAll()
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


export const getTemuanbyId = async(req, res) => {

    console.log(req.userId);
    try {
        const temuan = await Temuan.findOne({
            where:{
                uuid:req.params.id
            }
        })
        if(!temuan) return res.status(404).json({
            msg:"Data Tidak Ditemukan"
        })
        let response;
        if(req.role === "admin"){
            response = await Temuan.findOne({
                // attributes:['uuid','name','price'],
                where:{
                    id:temuan.id
                },
                include:[{
                    model:Users
                },{
                    model:Source
                },{
                    model:Dpt
                },{
                    model:Justifikasi
                }]
            })
        }else{
            response = await Temuan.findOne({
                // attributes:['uuid','name','price'],
                where:{
                    [Op.and]:[{id:temuan.id}, {userId:req.userId}] 
                },
                include:[{
                    model:Users
                },{
                    model:Source
                },{
                    model:Dpt
                },{
                    model:Justifikasi
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

export const createTemuan = async(req, res) => {
    const {noTemuan, sourceId, ringkasan, klasifikasi, persyaratan, gapAnalysis, rootId, perbaikan, pencegahan, dptId, date, bukti, status} = req.body
    try {
        await Temuan.create({
            noTemuan:noTemuan, 
            sourceId:sourceId, 
            ringkasan:ringkasan, 
            klasifikasi:klasifikasi, 
            persyaratan:persyaratan, 
            gapAnalysis:gapAnalysis, 
            rootId:rootId, 
            perbaikan:perbaikan, 
            pencegahan:pencegahan, 
            userId:req.userId, 
            dptId:req.dptId, 
            date:date, 
            bukti:bukti, 
            status:status 
        })
        res.status(200).json({
            msg:"Temuan Berhasil Ditambahkan"
        })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const updateTemuan = async(req, res) => {
    try {
        const temuan = await Temuan.findOne({
            where:{
                uuid:req.params.id
            }
        })
        if(!temuan) return res.status(404).json({
            msg:"Data Tidak Ditemukan"
        })
        
        const {noTemuan, sourceId, ringkasan, klasifikasi, persyaratan, gapAnalysis, rootId, perbaikan, pencegahan, dptId, date, bukti, status} = req.body
        if (req.role === 'admin') {
            await Temuan.update({noTemuan, sourceId, ringkasan, klasifikasi, persyaratan, gapAnalysis, rootId, perbaikan, pencegahan, dptId, date, bukti, status},{
                where:{
                    id:temuan.id
                }
            })
        } else {
            if (req.userId !== temuan.userId) return res.status(400).json({msg:"Akses Terlarang"})
            await temuan.update({noTemuan, sourceId, ringkasan, klasifikasi, persyaratan, gapAnalysis, rootId, perbaikan, pencegahan, dptId, date, bukti, status},{
                where:{
                    [Op.end]:[{id:temuan.id}, {userId:req.userId}]
                }
            })
        }
        res.status(200).json({
            msg:"Temuan Berhasil di Update"
        })
    } catch (error) {
        res.status(500).json(error.message)
    }
}


export const deleteTemuan = async(req, res) =>{
    try {
        const temuan = await Temuan.findOne({
            where:{
                uuid:req.params.id
            }
        })
        if(!temuan) return res.status(404).json({msgL:"Temuan Tidak Ditemukan"})
        if(req.role === 'admin'){
            await Temuan.destroy({
                where:{
                    id:temuan.id
                }
            })
        }else if(req.role !== 'admin') {
            if(req.userId !== temuan.userId) return res.status(404).json({msg:"Temuan tidak ditemukan"})
            await Temuan.destroy({
                where:{
                    id:temuan.id
                }
            })
        }
        res.status(200).json({
            msg:"Temuan Berhasil Terhapus"
        })
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}


export const updateStatus = async(req, res) =>{
    try {
        const temuan = await Temuan.findOne({
            where:{
                uuid:req.params.id
            }
        })
        if(!temuan) return res.status(404).json({msgL:"Temuan Tidak Ditemukan"})
        
        const {status} = req.body
        if(req.role === 'admin'){
            await Temuan.update({status},{
                where:{
                    id:temuan.id
                }
            })
        }else if(req.role !== 'admin') {
            if(req.userId !== temuan.userId) return res.status(404).json({msg:"Temuan tidak ditemukan"})
            await Temuan.update({status},{
                where:{
                    [Op.end] :[{id:temuan.id},{userId:req.params.id}] 
                }
            })
        }
        res.status(200).json({
            msg:"Status Berhasil Terupdate"
        })
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}