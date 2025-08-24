import express from "express";
import "dotenv/config";
import { env } from "process";

const app = express();
const port: number = Number(process.env.port) || 3000; //could crash

// (bara för test) const secret = process.env.MY_GLOBAL_TEST_SECRET

app.get("/", (request, response) => {
  response.send("Hello world!");
});

//start server on port variable
app.listen(port, "0.0.0.0", () => {
  console.log(`Listening to port ${port}`);
});
