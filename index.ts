import "dotenv/config"
import express, { Request, Response, Router } from "express";
import responseTime from 'response-time'
import client from "./cache/redis-client";
import searchRouter from "./routes/search";
import cors from "cors"

const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN,
  optionsSuccessStatus: 200
};

const app = express();
const PORT = 5000;


app.use(responseTime())
app.use(cors(corsOptions));
app.use("/search",searchRouter)
app.get("/health", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.listen(PORT, async () => {
  await client.connect() 
  console.log(`Server running on http://localhost:${PORT}`);
});
