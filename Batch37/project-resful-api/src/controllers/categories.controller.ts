import { Request, Response, NextFunction } from "express";
import categories from "../data/categories.json";
import categoriesService from "../services/categories.service";
import { error } from "console";
const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await categoriesService.getAll(req.query);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await categoriesService.getById(id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const category = await categoriesService.createCategory(data);
    res.status(201).json({
      message: "Create Category",
      category: category,
    });
  } catch (err) {
    next(err);
  }
};
const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const category = await categoriesService.updateCategory(id, data);
    res.status(201).json({
      message: "Create Category",
      category: category,
    });
  } catch (err) {
    next(err);
  }
};
const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const category = await categoriesService.deleteCategory(id);
    res.status(201).json({
      message: "Create Category",
      category: category,
    });
  } catch (err) {
    next(err);
  }
};
export default {
  getAll,
  getById,
};
