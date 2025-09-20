import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { sendResponse } from "../utils/sendResponse";
import fi from "zod/v4/locales/fi.cjs";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserService.createUser(req.body);
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "User created Successfully!",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return sendResponse(res, {
        success: false,
        statusCode: 401,
        message: "Unauthorized",
        data: null,
      });
    }
    
    const userProfile = await UserService.getUserById(req.user.id);
    
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User profile retrieved successfully!",
      data: userProfile,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createUser,
  getUserProfile,
};
