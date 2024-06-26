import { Request, Response, NextFunction } from "express";
import productsService from "../services/products.service";
import { sendJsonSuccess } from "../helpers/responseHandle";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await productsService.getAll(req.query);
    //console.log('result',result);
    //res.status(200).json(result)
    sendJsonSuccess(res)(result);
  } catch (err) {
    next(err);
  }
};

const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params; //return id = string
    const product = await productsService.getProductById(id);
    sendJsonSuccess(res)(product);
  } catch (err) {
    next(err);
  }
};

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;

    const product = await productsService.createProduct(data);

    // res.status(201).json({
    //     message: `Create Product`,
    //     product: product
    // })
    sendJsonSuccess(res, "Create Product successfully", 201)(product);
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const product = await productsService.updateProduct(id, data);

    // res.status(200).json({
    //     message: `Update Product by ID ${id}`,
    //     product: product
    // })
    sendJsonSuccess(res)(product);
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const Product = await productsService.deleteProduct(id);
    sendJsonSuccess(res)(Product);
  } catch (err) {
    next(err);
  }
};

export default {
  getAll,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
