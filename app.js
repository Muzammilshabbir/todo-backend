require("dotenv").config();
import express from "express";


import logger from "morgan";
import routeSetup from "./routes/v1";
import cors from "cors";
import path from "path"
import cookieParser from 'cookie-parser'
// const folderName = "utils/translations";
// const folderPath = path.join(__dirname, folderName);
const assetFolderName = "uploads";
const assetFolderPath = path.join(__dirname, assetFolderName);
// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger("dev"));
app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "1000MB" }));

// app.use(express.static(assetFolderPath));
app.use('/uploads', express.static(assetFolderPath));



routeSetup(app);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get("*", async (req, res) => {
  return res.status(200).send({
    message: "Welcome to the beginning",
  });
});
export default app;
