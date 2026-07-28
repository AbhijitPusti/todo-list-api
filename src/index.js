const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
require('dotenv').config();

connectDB();

const app=express();

app.use(express.json());
app.use('/', authRoutes);
app.use('/todos', todoRoutes);

app.get('/',(req,res)=>{
    res.send('Todo api is running');
});

const PORT = process.eventNames.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`Server is running on:${PORT}`)
});