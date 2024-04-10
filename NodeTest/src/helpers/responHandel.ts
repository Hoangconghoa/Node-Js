import { Request, Response } from "express";
const sendJsonSuccess = (res: Response, message = "Success", code = 200) => {
  return (data: any = null) => {
    const resData = data
      ? { statusCode: code, message, data }
      : { statusCode: code, message };
    res.status(code).json(resData);
  };
};

const sendJsonError = (res: Response, req: Request, err: any) => {
  return res.status(err.status || 500).json({
    statusCode: err.status || 500,
    message: err.message || "unhandelError",
  });
};
export { sendJsonError, sendJsonSuccess };
