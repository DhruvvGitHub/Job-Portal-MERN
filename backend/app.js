import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/userRoute.js";
import companyRoute from "./routes/companyRoute.js";
import jobRoute from "./routes/jobRoutes.js";
import applicationRoute from "./routes/applicationRoute.js";


const app = express()
dotenv.config()

connectDB()

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}
app.use(cors(corsOptions))

//routes
app.use("/user", userRoute)
app.use("/company", companyRoute)
app.use("/job", jobRoute)
app.use("/application", applicationRoute)
app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Welcome to homepage"
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {PORT})