import { PrismaClient } from "@prisma/client";
import { IUser } from "../interfaces/user.interface";
import bcryptjs from "bcryptjs"
const prisma = new PrismaClient()
export const createUser= async(payload: Partial<IUser>)=>{

    const {    
        firstname,
        lastname,
        email,
        student_id,
        department,
        password,
        role
    } = payload

    const isUserExists = await prisma.users.findUnique({
        where: {
            email: payload.email,
        },
    });
    if(isUserExists){
         throw new Error("user already exists")
    }
    
      if (
    !firstname ||
    !lastname ||
    !email ||
    !student_id ||
    !department ||
    !password
  ) {
    throw new Error("Missing required fields");
  }
    const hashedPassword =await bcryptjs.hash(password,10)
    if(!hashedPassword){
        throw new Error("password Missing");
    }
    const user = await prisma.users.create({
        data: {
            firstname,
            lastname,
            email,
            student_id,
            department,
            password:hashedPassword,
            role: role || "member",
        },
    })
    return user;
}

export const UserService = {
    createUser
}