import express, { Express, Request, Response, NextFunction } from "express";
const app: Express = express();
import cors from "cors";
import Categoriesrouter from "./routes/v1/categoris.route";
import Brandsrouter from "./routes/v1/brands.route";
import Productsrouter from "./routes/v1/products.route";
import routerAuth from "./routes/v1/auth.route";
import routerCustomer from "./routes/v1/customers.route";
import routerStaffs from "./routes/v1/staffs.route";
import { sendJsonErrors } from "./helpers/responseHandle";
app.use(cors({ origin: "*" }));
//bắt kiểu json từ client gửi lên
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//định nghĩa các route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Express + TypeScript Server" });
});
//
app.use("/api/v1/categories", Categoriesrouter);
app.use("/api/v1/brands", Brandsrouter);
app.use("/api/v1/products", Productsrouter);
app.use("/api/v1/auth", routerAuth);
app.use("/api/v1/customers", routerCustomer);
app.use("/api/v1/staffs", routerStaffs);
//error
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  const statusCode = err.status || 500;
  // res.status(statusCode).json({
  //   statusCode: statusCode,
  //   message: err.message
  // });
  sendJsonErrors(req, res, err);
});
export default app;
