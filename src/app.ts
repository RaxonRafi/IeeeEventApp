import express, { Application, Request, Response } from "express";
import { config } from "dotenv";
import { router } from "./routes";
import { errorHandler } from "./middlewares/error.middleware";


config();
const app: Application = express();

app.use(express.json());
app.use("/api/",router)

app.get('/',(req: Request,res:Response)=>{
    res.send('Welcome to PUC IEEE Event App')
})

app.use(errorHandler);
export default app;