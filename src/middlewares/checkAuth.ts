import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

import { envVars } from "../config/env";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../utils/jwt";
const prisma = new PrismaClient()


declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        throw new Error("No token received");
      }
      const verifiedToken = verifyToken(
        accessToken,
        envVars.JWT_SECRET
      ) as JwtPayload;

      const user = await prisma.users.findUnique({
        where: { email: verifiedToken.email },
      });

      if (!user) {
        throw new Error("User does not exist");
      }


      if (!authRoles.includes(user.role)) {
        throw new Error("Access denied");
      }

      req.user = verifiedToken;

      next();
    } catch (error) {
      console.error("JWT Auth Error:", error);
      next(error);
    }
  };
