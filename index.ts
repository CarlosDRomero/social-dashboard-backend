import express, { Request, Response } from "express";

const app = express();
const PORT = 5000;

app.get("/health", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
