import express, { Application, Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";
import { router } from "./routes";
import { errorHandler } from "./middlewares/error.middleware";


config();
const app: Application = express();

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000',    // React/Next.js development
    'http://localhost:3001',    // Alternative frontend port
    'http://127.0.0.1:3000',    // Alternative localhost format
  ],
  credentials: true,              // Allow cookies and auth headers
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use("/api/",router)

app.get('/',(req: Request,res:Response)=>{
    res.send('Welcome to PUC IEEE Event App')
})

app.use(errorHandler);
export default app;