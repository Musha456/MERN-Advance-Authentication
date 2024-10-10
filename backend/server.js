import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import path from "path"
import { connectDB } from './db/connectDB.js';
import authRouter from './routes/auth.route.js';


const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
app.use(cors({ origin: "http://localhost:5173", credentials: true}))
app.use(express.json()); // Allows us to parse incomming requests:req.body
app.use(cookieParser()); // Allows us to parse incomming cookies

app.use("/api/auth", authRouter);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on the port ${PORT}`);
})