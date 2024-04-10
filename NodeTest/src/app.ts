import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import routeUser from "./routes/v1/users.route";
const app: Express = express();
export default app;
//Để bắt được kiểu JSON từ client gửi lên
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({ origin: "*" })); //Cho phép gọi bất kỳ đâu
//use route
app.use("/api/v1/users", routeUser);
