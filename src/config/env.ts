import dotenv from "dotenv"

dotenv.config()

interface EnvConfig{
    DATABASE_URL: string
    PORT: string
    JWT_SECRET: string
    JWT_EXPIRES_IN: string
}

const loadEnvVariables = () =>{
    const requiredEnvVariables: string[] = [
        "DATABASE_URL",
        "PORT",
        "JWT_SECRET",
        "JWT_EXPIRES_IN"
    ]
    requiredEnvVariables.forEach(key=>{
        if(!process.env[key]){
           throw new Error(`Missing required environment variables ${key}`)
        }
    })
    return{
        DATABASE_URL: process.env.DATABASE_URL as string,
        PORT: process.env.PORT as string,
        JWT_SECRET: process.env.JWT_SECRET as string,
        JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as string
    }
}

export const envVars:EnvConfig = loadEnvVariables()