import User from '../models/UserModel.js';
import argon2 from 'argon2';
import Dpt from '../models/DptModels.js';

export const Login = async (req, res) => {
    const user = await User.findOne({
        where:{
            email:req.body.email
        }
    })
    if(!user) return res.status(404).json({
        msg:"User Tidak Ditemukan"
    })
    const match = await argon2.verify(user.password, req.body.password)
    console.log(match);
    if(!match) return res.status(400).json({
        msg:"Wrong Password"
    });
    //set session "kita berikan userId / uuid sebagai session"
    req.session.userId = user.uuid
    const uuid = user.uuid
    const name = user.name
    const email = user.email
    const role = user.role
    const dptId = user.dptId
    res.status(200).json({
        uuid, name, email, role, dptId
    })
}

//function untuk get user login
export const Me = async (req, res) =>{
    if(!req.session.userId) return res.status(401).json({
        msg:"Please Login Ke Akun Anda"
    })
    const uuid = req.session.userId
    const user = await User.findOne({
        attributes:['uuid','name','email','role','url','image'],
        where:{
            uuid:uuid
        },
        include:[{model:Dpt}]
    })
    if(!user) return res.status(404).json({
        msg:"User Tidak Ditemukan"
    })
    res.status(200).json(user)
}

export const Logout = (req, res) =>{
    console.log(req.session);
    req.session.destroy((err) =>{
        if(err) return res.status(400).json({
            msg:"tidak dapat Logout"
        })
    })
    res.status(200).json({
        msg:"Anda Telah Logout"
    })
}
