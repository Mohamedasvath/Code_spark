import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";


dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

//Routes 
app.use("/api/auth",authRoutes);
app.use("/api/clients",clientRoutes);
app.use("/api/invoices",invoiceRoutes);
app.use("/api/contact",contactRoutes);
app.get("/",(req,res)=>{
res.send("CodeSpark API Running");
});

app.listen(process.env.PORT,()=>{
console.log(`Server running at http://localhost:${process.env.PORT} 🚀`);
});