import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import doctorRoute from "./Routes/doctor.js";
import reviewRoute from "./Routes/review.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 8000;

const corsOptions = {
    origin: true // allows any domain to accesss the server's resources which helpful during development in a production application we would want to restrict the allowed origin more strictly.
}

app.get("/", (req, res)=>{
    res.send("App is runing fine");
});

// database connection
mongoose.set('strictQuery', false);
const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("Connected to DB");
    } catch(err){
        console.log(err);
        console.log("MongoDB database connection failed");
    }
}

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/reviews", reviewRoute);

app.listen(port, ()=>{
    connectDB();
    console.log(`Your app is listening on http://localhost:${port}`);
});