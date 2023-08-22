import express from 'express';
import Product from '../Models/productModel.js';
import data from '../data.js';

const seedRouter = express.Router();

seedRouter.get('/',async(req,res)=>{
  try {
    await Product.deleteMany({})
    const CreatedProduct = await Product.insertMany(data.products);
    res.send({CreatedProduct});
  } catch (error) {
    res.status(500).send({error: error.message})
  }
    
});
export default  seedRouter;