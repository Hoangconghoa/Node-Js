import express from "express";
import customersController from "../../controllers/customers.controller";
import { error } from "console";
import fs from "node:fs";
const router = express.Router();
const filename = "customers.json";
//định nghĩa các route cho categori
router.get("", customersController.getAll);
//get by id http://localhost:8080/api/v1/customers:id
router.get("/:id", customersController.getById);
//Create category 
///http://localhost:8080/api/v1/customers
router.post('',  customersController.createCustomer)

//Update category By ID
///http://localhost:8080/api/v1/customers/:id
router.put('/:id', customersController.updateCustomer)

//Delete category By ID
///http://localhost:8080/api/v1/customers/:id
//Chỉ chó phép role = admin moi xoa dc
//router.delete('/:id',authenticateToken, authorize(['admin', 'subAdmin']), customersController.deleteCustomer)
export default router;
