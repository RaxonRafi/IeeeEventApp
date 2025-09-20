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

const getUserById = async (id: number) => {
    const user = await prisma.users.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            student_id: true,
            department: true,
            role: true,
            createdAt: true,
        },
    });
    
    if (!user) {
        throw new Error("User not found");
    }
    
    return user;
}

export const UserService = {
    createUser,
    getUserById
}