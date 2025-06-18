import dotenv from "dotenv";
dotenv.config()

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import connectDB from "./utils/db.js";
import userRoute from "./routes/userRoute.js";
import companyRoute from "./routes/companyRoute.js";
import jobRoute from "./routes/jobRoutes.js";
import applicationRoute from "./routes/applicationRoute.js";

const app = express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}
app.use(cors(corsOptions))

app.use("/user", userRoute)
app.use("/company", companyRoute)
app.use("/job", jobRoute)
app.use("/application", applicationRoute)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});