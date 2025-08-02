
import { Request, Response, NextFunction } from "express";

import { sendResponse } from "../utils/sendResponse";
import { AuthService } from "../services/auth.service";

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.loginUser(req.body);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User logged in successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AuthController = {
  loginUser,
};
