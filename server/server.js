require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const studentRoutes = require('./routes/studentRoutes');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(()=>console.log("Keshab, Don't Worry, Database Connected")
).catch((err) => console.log("Database Not Connected, because ", err));

app.use('/api/students', studentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Hii Keshab, Your bankend is running on port ${PORT}`));