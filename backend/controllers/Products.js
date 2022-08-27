import Product from "../models/ProductsModels.js"
import Users from "../models/UserModel.js";
import {Op, where} from "sequelize";
import path from 'path';
import Products from "../models/ProductsModels.js";
import fs from 'fs';

export const getProduct = async(req, res) =>{
    console.log(req.userId);
    try {
        let response;
        if(req.role === "admin"){
            response = await Product.findAll({
                attributes:['uuid','name','price','url','image'],
                include:[{
                    model:Users,
                    attributes:['name','email']
                }]
            })
        }else{
            response = await Product.findAll({
                attributes:['uuid','name','price','url','image'],
                where:{
                    userId:req.userId
                },
                include:[{
                    model:Users,
                    attributes:['name','email']
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

export const getProductById = async(req, res) =>{
    try {
        const product = await Product.findOne({
            where:{
                uuid:req.params.id
            }
        })
        if(!product) return res.status(404).json({
            msg:"Data Tidak Ditemukan"
        })
        let response;
        if(req.role === "admin"){
            response = await Product.findOne({
                // attributes:['uuid','name','price'],
                where:{
                    id:product.id
                },
                include:[{
                    model:Users,
                    attributes:['name','email']
                }]
            })
        }else{
            response = await Product.findOne({
                attributes:['uuid','name','price'],
                where:{
                    [Op.and]:[{id:product.id}, {userId:req.userId}] 
                },
                include:[{
                    model:Users,
                    attributes:['name','email']
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

export const createProduct = async(req, res) =>{
    if(req.files === null) return res.status(400).json({msg:"Please Upload File"})
    const photoName = req.body.name;
    const file = req.files.file;
    console.log(req.files);
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowType = ['.png','.jpg','.jpeg']

    if(!allowType.includes(ext.toLowerCase())) return res.status(422).json({msg:"Invalid Image"});
    if(fileSize > 15000000) return res.status(422).json({msg:"Image Must Be Less Then 5 MB"});

    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg:err.message})
        const{name,price} = req.body
        try {
            await Product.create({
                name:name,
                image:fileName,
                url:url,
                price:price,
                userId:req.userId
            })
            res.status(201).json({
                msg:"Product Berhasil Ditambahkan"
            })
        } catch (error) {
            res.status(500).json(error.message)
        }
    })
}

export const updateProduct = async(req, res) =>{
    try {
        const product = await Product.findOne({
            where:{
                uuid:req.params.id
            }
        })
        if(!product) return res.status(404).json({
            msg:"Product Tidak Di Temukan"
        });
        
        const{name, price} = req.body;
        if (req.role === 'admin') {
            await Product.update({name,price},{
                where:{
                    id:product.id
                }
            })
        }else{
            if(req.userId !== product.userId) return res.status(403).json({msg:"Akses terlarang"})
            await Product.update({nama,price},{
                where:{
                    [Op.end]:[{id:product.id}, {userId:req.userId}]
                }
            });
        }
        res.status(200).json({msg:"Product Updated Success"})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const deleteProduct = async(req, res) =>{
    try {
        const product = await Product.findOne({
            where:{
                uuid:req.params.id
            }
        })
        if(!product) return res.status(404).json({msgL:"Product Tidak Ditemukan"})
        
        
        //#####
        //menghapus file image pada folder
        const filePath = `./public/images/${product.image}`;
        console.log(filePath);
        fs.unlinkSync(filePath);
        const name = req.body.name;
        const price = req.body.price;
        if(req.role === 'admin'){
            await Product.destroy({
                where:{
                    id:product.id
                }
            })
        }else if(req.role !== 'admin') {
            if(req.userId !== product.userId) return res.status(404).json({msg:"Ptoduct tidak ditemukan"})
            await Product.destroy({
                where:{
                    id:product.id
                }
            })
        }
        res.status(200).json({
            msg:"Product Berhasil Terhapus"
        })
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}


