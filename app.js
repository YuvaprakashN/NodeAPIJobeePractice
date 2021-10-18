const express=require("express")
const dotEnv=require("dotenv")

dotEnv.config({path:"./config/config.env"})
const jobRoutes=require("./routes/jobs")
const mongoConnection=require("./config/database")
mongoConnection()
const errorMiddleware = require('./middlewares/errors');

const app=express()
app.use(express.json())

app.use("/api/v1",jobRoutes)

// Middleware to handle errors
app.use(errorMiddleware);
const PORT=process.env.PORT
app.listen(PORT,()=>console.log(`Server: ${process.env.PORT}`))