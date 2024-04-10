import { Request, Response, NextFunction } from "express";
import customersService from "../services/customers.service";
import { error } from "console";
const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await customersService.getAll(req.query);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await customersService.getById(id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const createCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const Customer = await customersService.createCustomer(data);
    res.status(201).json({
      message: "Create Customer",
      Customer: Customer,
    });
  } catch (err) {
    next(err);
  }
};
const updateCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const Customer = await customersService.updateCustomer(id, data);
    res.status(201).json({
      message: "Create Customer",
      Customer: Customer,
    });
  } catch (err) {
    next(err);
  }
};
const deleteCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const Customer = await customersService.deleteCustomer(id);
    res.status(201).json({
      message: "Create Customer",
      Customer: Customer,
    });
  } catch (err) {
    next(err);
  }
};
export default {
  getAll,
  getById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
