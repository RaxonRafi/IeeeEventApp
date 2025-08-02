import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { sendResponse } from "../utils/sendResponse";

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

export const UserController = {
  createUser,
};
