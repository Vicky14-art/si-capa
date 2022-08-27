import User from "../models/UserModel.js";
import argon2 from 'argon2';
import Dpt from "../models/DptModels.js";
import path from 'path'
import {Op} from "sequelize";
import { response } from "express";


export const getUsers = async(req, res) =>{
    // const page = parseInt(req.query.page) || 0;
    // const limit = parseInt(req.query.page) || 10;
    
    try {
        const search = req.query.search || '';
        const response = await User.findAll({
            where:{
                [Op.or]:[{name:{
                    [Op.like]:'%'+search+'%'
                }},{email:{
                    [Op.like]:'%'+search+'%'
                }}]
            },
            include:[{model:Dpt}],
            order:[
                ['id', 'DESC']
            ]
        });
        res.json(response)
    } catch (error) {
        res.status(500).json(error.message)
    }
    // try {
    //     const response = await User.findAll({
    //         attributes:['uuid','name','email','role','dptId'],
    //         include:[{
    //             model:Dpt,
    //             attributes:['uuid','name','initial']
    //         }]
    //     })
    //     res.status(200).json(response)
    // } catch (error) {
    //     res.status(500).json({
    //         msg:error.message
    //     })
    // }
}


export const getUserById = async(req, res) =>{
    try {
        const response = await User.findOne({
            attributes:['uuid','name','email','role','url','image'],
            where:{
                uuid:req.params.id
            },
            include:[{model:Dpt}]
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({
            msg:error.message
        })
    }
}

export const createUser = async(req, res) =>{
    if(req.files === null) return res.status(404).json({msg:"Please Update Photo"});
    const photoName = req.body.name;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5+ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowTypes = ['.png','.jpg','.jpeg'];

    if(!allowTypes.includes(ext.toLowerCase())) return res.status(422).json({msg:"Invalid Image"})
    if(fileSize > 15000000) return res.status(422).json({msg:"File Lebih besar dari 15 mg"})

    file.mv(`./public/images/${fileName}`, async(err) =>{
        if(err) return res.status(500).json({msg:err.message})
        const {name, email, password, confPassword, role, dptId}= req.body;
        if(password !== confPassword) return res.status(400).json({
                msg:"Password Tidak Sesuai dengan Confirm Password"
            })
            const hasPassword = await argon2.hash(password)
            try {
                await User.create({
                    name:name,
                    email:email,
                    password:hasPassword,
                    role:role,
                    dptId:dptId,
                    image:fileName,
                    url:url
                });
                res.status(201).json({
                    msg:"Register Berhasil"
                })
            } catch (error) {
                res.status(400).json({
                    msg:error.message
                })
                
            }

        

    })


}

export const updateUser = async(req, res) =>{
    const user = await User.findOne({
        where:{
            uuid:req.params.id
        }
    })
    if (!user) return res.status(404).json({
        msg:"User Tidak Ditemukan"
    })
    const {
        name,
        email,
        password,
        confPassword,
        role,
        dptId
    } = req.body;
    let hashPassword;
    if (password === "" || password === null) {
        hashPassword=user.password
    } else{
        hashPassword= await argon2.hash(password)
    }
    if (password !== confPassword) return res.status(400).json({
        msg:"Password dan Confrim Password Tidak Sama"
    })

    //update data base
    try {
        await User.update({
            name:name,
            email:email,
            password:hashPassword,
            role:role,
            dptId:dptId
        },{
            where:{
                uuid:user.id
            }
        });
        res.status(200).json({
            msg:"User Terupdate"
        })
    } catch (error) {
        
    }
}

export const deleteUser = async(req, res) =>{
   const user = await User.findOne({
    where:{
        uuid:req.params.id
    }
   })
   if (!user) return res.status(404).json({
    msg:"User Tidak Ditemukan"
   })
   try {
    await User.destroy({
        where:{
            id:user.id
        }
    })
    res.status(200).json({
        msg:"User Deleted"
    })
   } catch (error) {
    res.status(400).json({
        msg:error.message
    })
   }
}


