import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import app from "./src/app.js";

dotenv.config();
const PORT = 3310;

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
