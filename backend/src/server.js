import express from 'express';
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/RateLimiter.js'
import cors from "cors"

const app = express();

const PORT = process.env.PORT || 5001;

dotenv.config();

connectDB();

//middleware
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());
app.use(rateLimiter);

//custom middleware
app.use((req,res,next) => {
    console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
    next();
})

app.use("/api/notes", notesRoutes);
app.listen(PORT, () => {
    console.log('Server is running on port:', PORT)
});



