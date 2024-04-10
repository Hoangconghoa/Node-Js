import { Request, Response, NextFunction } from "express";
const sendJsonSuccess = (res: Response, Message = "Success", code = 200) => {
  return (data: any = null) => {
    const resData = data
      ? { statuscode: code, Message, data }
      : { statuscode: code, Message };
    res.status(code).json(resData);
  };
};
const sendJsonErrors = (req: Request, res: Response, error: any) => {
  return res.status(error.status || 500).json({
    statuscode: error.status || 500,
    Message: error.Message || "Unhandled Errors",
    error,
  });
};
export { sendJsonSuccess, sendJsonErrors };
