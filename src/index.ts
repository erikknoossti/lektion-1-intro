
import express from "express";
import "dotenv/config"

const app = express();
const port: number = 3000;

// (bara för test) const secret = process.env.MY_GLOBAL_TEST_SECRET

app.get("/", (req, res) => {
  res.status(200).send("<h2> My website </h2> <p> Hello world </p>");
});

//start server on port variable
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  // (test) console.log(secret) //bara för debugging
});

