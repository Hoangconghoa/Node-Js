import express from "express";
import categories from "../../data/categories.json";
import categoriesController from "../../controllers/categories.controller";
import { error } from "console";
import fs from "node:fs";
const router = express.Router();
const filename = "categories.json";
//định nghĩa các route cho categori
router.get("", categoriesController.getAll);
//get by id http://localhost:8080/api/v1/categories:id
router.get("/:id", categoriesController.getById);
//Post by id http://localhost:8080/api/v1/categories:id
router.post("", (req, res) => {
  const data = req.body;
  const newCategories = [...categories, data];
  // fs.writeFile(filename, JSON.stringify(newCategories), function (err) {
  //   if (err) throw err;
  //   console.log("Saved!");
  // });
  res.status(200).json(JSON.stringify(newCategories));
});
//Update by id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;
  res.status(200).json({
    message: `Update Categories by ${id}`,
    payload: data,
  });
});
//delete categori by id http://localhost:8080/api/v1/categories:id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const newCategories = categories.filter((c) => c.id != parseInt(id));
  if (!newCategories) {
    throw error("Category not found");
  }
  res.status(200).json(newCategories);
});
export default router;
