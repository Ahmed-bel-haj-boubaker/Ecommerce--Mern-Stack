import express from "express";
import data from "./data.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./Routes/seedRoutes.js";
import productRouter from "./Routes/ProductRoutes.js";

dotenv.config(); // to access the .env file
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected To MongoDB");
  })
  .catch((err) => {
    console.error("Error Connecting To MongoDb", err);
  });

const app = express();

app.use('/api/seed',seedRouter);
app.use('/api/products',productRouter)




const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
