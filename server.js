const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const contactRoutes = require("co")
const db = require("./config/db")
dotenv.config();
const app = express()
app.use(express.json())
app.use("/api/contacts",contactRoutes)
const PORT = process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`Server is running on Port ${PORT}`);
})