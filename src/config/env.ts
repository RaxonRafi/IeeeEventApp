import dotenv from "dotenv"

dotenv.config()

interface EnvConfig{
    DATABASE_URL: string
    PORT: string
}

const loadEnvVariables = () =>{
    const requiredEnvVariables: string[] = [
        "DATABASE_URL",
        "PORT",
    ]
    requiredEnvVariables.forEach(key=>{
        if(!process.env[key]){
           throw new Error(`Missing required environment variables ${key}`)
        }
    })
    return{
        DATABASE_URL: process.env.DATABASE_URL as string,
        PORT: process.env.PORT as string
    }
}

export const envVars:EnvConfig = loadEnvVariables()