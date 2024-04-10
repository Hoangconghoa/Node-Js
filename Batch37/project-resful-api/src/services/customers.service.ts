import { Request, Response } from "express";

import { error } from "console";
import Customer from "../models/customers.models";
import { Icatgory } from "../type/models";

const getAll = async (query: any) => {
  //Phân trang
  const currentPage = query && query.page ? parseInt(query.page as string) : 1; //trang hiện tại
  const pageSize = query && query.limit ? parseInt(query.limit as string) : 5; // Số lượng items trên 1 trang

  //Sắp xếp tùy chọn theo trường
  let sortObject: any = {}; //Mặc định theo trường sort ASC
  const sortBy = query && query.sortBy ? query.sortBy : "sort";
  const sortType =
    query && query.sortType && query.sortType === "DESC" ? -1 : 1;
  //Thêm phần tử vảo object rỗng
  sortObject = { ...sortObject, [sortBy]: sortType };

  //Đếm tổng số record hiện có của collection Product
  const count = await Customer.countDocuments();

  //Lấy danh sách khớp với điều kiện cần lấy
  const customers = await Customer.find({})
    .select("-__v")
    .sort(sortObject)
    .skip((currentPage - 1) * pageSize)
    .limit(pageSize);

  //Số phần tử khớp với điều kiện lọc được
  const filteredCount = customers.length;

  return {
    limit: pageSize, // số lượng item trên 1 trang
    page: currentPage, //trang hiện tại
    totalPages: Math.ceil(count / pageSize), //tổng số trang
    totalItems: count, //tổng số records
    filteredCount, //số record khớp điều kiện
    sortBy: sortObject,
    customers: customers,
  };
};
const getById = async (id: String) => {
  const result = await Customer.findById(id);

  if (!result) {
    throw error(404, "Customer not Found");
  }
  return result;
};
const createCustomer = async (data: Icatgory) => {
  const result = await Customer.create(data);
  return result;
};
const updateCustomer = async (id: String, data: Icatgory) => {
  const result = await Customer.findByIdAndUpdate(id, data, {
    new: true,
  });
  return result;
};
const deleteCustomer = async (id: String) => {
  const result = await Customer.findByIdAndDelete(id);
  return result;
};
export default {
  getAll,
  getById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
