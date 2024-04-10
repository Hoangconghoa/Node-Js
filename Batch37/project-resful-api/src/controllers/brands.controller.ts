import { Request, Response, NextFunction } from "express";
import brands from "../data/brands.json";
import brandsService from "../services/brands.service";
import { error } from "console";
const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await brandsService.getAll(req.query);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await brandsService.getById(id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const createBrand = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const Brand = await brandsService.createBrand(data);
    res.status(201).json({
      message: "Create Brand",
      Brand: Brand,
    });
  } catch (err) {
    next(err);
  }
};
const updateBrand = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const Brand = await brandsService.updateBrand(id, data);
    res.status(201).json({
      message: "Create Brand",
      Brand: Brand,
    });
  } catch (err) {
    next(err);
  }
};
const deleteBrand = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const Brand = await brandsService.deleteBrand(id);
    res.status(201).json({
      message: "Create Brand",
      Brand: Brand,
    });
  } catch (err) {
    next(err);
  }
};
export default {
  getAll,
  getById,
};
