import express, { Request, Response, Router } from "express";
import axios from 'axios'
import responseTime from 'response-time'
import client from "./cache/redis-client";
import searchRouter from "./routes/search";

const app = express();
const PORT = 5000;


app.use(responseTime())
app.use("/search",searchRouter)
app.get("/health", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.listen(PORT, async () => {
  await client.connect() 
  console.log(`Server running on http://localhost:${PORT}`);
});
