import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { envVars } from "../config/env";


const prisma = new PrismaClient();

const JWT_SECRET = envVars.JWT_SECRET;
const JWT_EXPIRES_IN = envVars.JWT_EXPIRES_IN;

const loginUser = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;

  const user = await prisma.users.findUnique({ where: { email } });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new Error("Invalid credentials");
  }

const token = jwt.sign(
  payload,
  JWT_SECRET as string,
  {
    expiresIn: JWT_EXPIRES_IN, 
  } as SignOptions
);

  return {
    accessToken: token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  };
};

export const AuthService = {
  loginUser,
};
