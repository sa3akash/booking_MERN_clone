import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";


app.use(express.json({limit: "16mb"}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// medleware
app.use("/api", router)
app.use(cors())
// connect to the database
mongoose.connect(process.env.MONGO_URI)
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("DB connected...");
  });


app.use((error, req, res, next)=>{
    const errorStatus = error.status || 500;
    const errorMessage = error.message ||"This is server side error";

    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: error.stack
    });
})

app.listen(process.env.PORT, ()=>console.log(`Server is running on port ${process.env.PORT}`));