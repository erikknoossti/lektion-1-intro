import express, { type Request, type Response } from "express";
import "dotenv/config";
import { runDB, closeDB } from "./db/database.js";

const app = express();
app.use(express.json());

//Types
interface User {
  id: number;
  name: string;
  email: string;
}
//endpoints
app.get("/", (_req: Request, res: Response) => {
  res.send("Hello world!");
});

app.post("/user", (_req: Request, res: Response) => {
  const user: User = { id: 1, name: "Alice", email: "alice@example.com" };
  //sätt status innan send()
  res.status(201).send(user);
});

function resolvePort(): number {
  const fromEnv = Number(process.env.PORT);
  if (Number.isFinite(fromEnv) && fromEnv > 0 && fromEnv < 65536) return fromEnv;
  return 3000; 
}
const PORT = resolvePort();

async function startServer() {
  try {
    await runDB();

    // Lyssna på 0.0.0.0 
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });

    process.on("SIGINT", async () => {
      console.log("Cleaning up...");
      try {
        await closeDB();
      } finally {
        process.exit(0);
      }
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
