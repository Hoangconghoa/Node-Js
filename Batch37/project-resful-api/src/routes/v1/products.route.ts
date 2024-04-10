import express from "express";
import products from "../../data/products.json";
import productsController from "../../controllers/products.controller";
import { error } from "console";
import fs from "node:fs";
const router = express.Router();
const filename = "products.json";
//định nghĩa các route cho categori
router.get("", productsController.getAll);
//get by id http://localhost:8080/api/v1/products:id
router.get("/:id", productsController.getProductById);
//Post by id http://localhost:8080/api/v1/products:id
router.post("", (req, res) => {
  const data = req.body;
  const newproducts = [...products, data];
  res.status(200).json(JSON.stringify(newproducts));
});
//Update by id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;
  res.status(200).json({
    message: `Update products by ${id}`,
    payload: data,
  });
});
//delete categori by id http://localhost:8080/api/v1/products:id
router.delete("/:id", productsController.deleteProduct);
export default router;
