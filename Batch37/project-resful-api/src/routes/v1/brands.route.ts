import express from "express";
import brands from "../../data/brands.json";
import brandsController from "../../controllers/brands.controller";
const router = express.Router();
const filename = "brands.json";
//định nghĩa các route cho categori
router.get("", brandsController.getAll);
//get by id http://localhost:8080/api/v1/brands:id
router.get("/:id", brandsController.getById);
//Post by id http://localhost:8080/api/v1/brands:id
router.post("", (req, res) => {
  const data = req.body;
  const newCategories = [...brands, data];
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
//delete categori by id http://localhost:8080/api/v1/brands:id

export default router;
