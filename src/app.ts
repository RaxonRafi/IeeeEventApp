import express, { Application, Request, Response } from "express";
import { config } from "dotenv";
import { router } from "./routes";


config();
const app: Application = express();

app.use(express.json());
app.use("/api",router)

app.get('/',(req: Request,res:Response)=>{
    res.send('Welcome to PUC IEEE Event App')
})

export default app;