import express, { Application, Request, Response } from "express";
import { config } from "dotenv";
import { userRouter } from "./routes/user.route";


config();
const app: Application = express();

app.use(express.json());
app.use("/api/user",userRouter)

app.get('/',(req: Request,res:Response)=>{
    res.send('Welcome to PUC IEEE Event App')
})

export default app;