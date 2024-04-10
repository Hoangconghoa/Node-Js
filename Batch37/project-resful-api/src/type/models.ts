import { ObjectId, Model } from "mongoose";
interface BaseProperties {
  sort: number;
  isActive: boolean;
}

export interface Icatgory {
  name: string;
  description?: string;
  slug: string;
}
export interface ICustomer extends BaseProperties {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  isEmailVerified: boolean;
  address: string;
  yard: string;
  district: string;
  province: string;
}
export interface IBrands extends BaseProperties {
  brandid: number;
  brandname: string;
}
export interface IProduct extends BaseProperties {
  productName: string;
  description?: string;
  slug: string;
  price?: number;
  stock?: number;
  discount?: number;
  modelYear?: string;
  thumbnail?: string;
  category: ObjectId;
  isDelete?: boolean;
  isBest?: boolean;
  isHot?: boolean;
  isNew?: boolean;
  isHome?: boolean;
}
export type ProductModelType = Model<IProduct>;

export interface IOders extends BaseProperties {
  orderid: number;
  customerid: number;
  orderstatus: number;
  oderdate: string;
  requiredate: Date;
  shippingdate: Date;
  staffid: number;
  ordernote: string;
  shippingaddress: string;
  shippingcity: string;
  paymenttype: number;
  orderamount: number;
}

export enum EnumRole {
  Admin = "admin",
  SubAdmin = "subAdmin",
  User = "user",
}

export enum EnumBoolean {
  Yes = "true",
  No = "false",
}

export interface IStaff extends BaseProperties {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  role?: EnumRole.Admin | EnumRole.SubAdmin | EnumRole.User;
  isEmailVerified?: boolean;
}
export interface IStaffMethods {
  comparePassword(n: string): boolean;
}
export type StaffModel = Model<IStaff, {}, IStaffMethods>;
export enum EnumOrderStatus {
  Pending = "pending",
  Confirmed = "confirmed",
  Canceled = "canceled",
  PrepareShipping = "prepareShipping",
  Shipping = "shipping",
  CancelShipping = "cancelShipping",
  Shipped = "shipped",
  PendingPaid = "pendingPaid",
  Paid = "paid",
  Refund = "refund",
  Finished = "finished",
}

export enum EnumPayments {
  Cash = "CASH",
  Credit = "CREDIT CARD",
  Cod = "COD",
}
export type TOrderItems = {
  product: ObjectId;
  quantity: number;
  price: number;
  discount: number;
};

export type TActionOrder = {
  staff: ObjectId;
  action: string;
  orderStatus: string;
  note: string;
};
export interface IOrder {
  customer: ObjectId;
  staff: ObjectId;
  orderDate: Date;
  requiredDate: Date;
  shippedDate: Date;
  paidDate: Date;
  orderStatus: EnumOrderStatus;
  shippingAddress: string;
  shippingYard: string;
  shippingCity: string;
  shippingDistrict: string;
  shippingProvince: string;
  paymentType: EnumPayments;
  orderNote?: string;
  orderItems: TOrderItems[];
  actions?: TActionOrder[];
  createdAt?: Date;
}
export type OrderModelType = Model<IOrder>;
