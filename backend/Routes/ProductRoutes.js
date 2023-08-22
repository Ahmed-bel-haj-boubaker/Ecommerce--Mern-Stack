import  express  from "express";
import Product from "../Models/productModel.js";

const productRouter = express.Router();

productRouter.get('/', async (req,res)=>{
   try {
    const products= await Product.find();
    res.send(products)
   } catch (error) {
    res.status(500).send({error:error.message})
   }
});

productRouter.get("/slug/:slug", async (req, res) => {
    const product =await Product.findOne({slug:req.params.slug});
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "product not found" });
    }
  });
  productRouter.get("/:_id", async(req, res) => {
    const product = await Product.findById(req.params._id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "product not found" });
    }
  });

  productRouter.post("/addProd", async (req,res)=>{
   
    console.log("data received");

  });

  productRouter.put("/updateProd/:_id", async (req,res)=>{
   
    console.log("data received");

  })

  productRouter.delete("/deleteProd/:_id", async (req,res)=>{
   
    console.log("data received");

  })















export default productRouter;