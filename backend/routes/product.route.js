import express from 'express';
import mongoose from 'mongoose';
import Product from "../models/product.model.js"
const router = express.Router();

export default router;

router.get('/', async function(req, res) {
    try{
          const prdList = await Product.find({});
          res.status(200).json({success:true,data:prdList});
    }catch (error){
       console.error("Error in cfetch resultd:", error.message);
       res.status(404).json({success:false,message:"server Error"});
    }
    
       
     });
    
     router.delete("/:id",async (req,res)=>{
       const {id} = req.params;
       console.log("id:" ,id);
       try{
          await Product.findByIdAndDelete(id);
          res.status(200).json({success:true,message:"Product Deleted"});
       }catch(error){
          console.error("Error in create delete:", error.message);
          res.status(404).json({success:false,message:"Product Not Found"});
       }
    });
    
    router.get("/", (req,res)=>{
       res.send("Hello Kar");
       console.log("id:");
    });
    
    router.put("/:id",async (req,res)=>{
       const {id} = req.params;
       const product = req.body;
    
       //const newProduct = new Product(product);
    
       //newProduct.price = "345.99"
    
       try{
          const updatedProd = await Product.findByIdAndUpdate(id,product, {new:true});
          res.status(200).json({success:true,data:updatedProd});
       }catch (error){
         console.error("Error in update product:", error.message);
         res.status(500).json({success:fasle,message:"Server Error"});
       }
    });
    
    router.post("/",async (req,res)=>{
       const product = req.body;
    
       if(!product.name || !product.price || !product.image){
          return res.status(400).json({success:false, message:"Please provide all fields"});
       }
    
       const newProduct = new Product(product);
    
       try{
        await newProduct.save();
        res.status(201).json({success:true,data:newProduct});
       }catch (error){
         console.error("Error in create product:", error.message);
         res.status(500).json({success:fasle,message:"Server Error"});
       }
    });
    