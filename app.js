const express=require("express")
const dotEnv=require("dotenv")

dotEnv.config({path:"./config/config.env"})
const jobRoutes=require("./routes/jobs")
const mongoConnection=require("./config/database")


// Handling Uncaught Exception
//It should above all declearation to handle un caught exception
// it occurs if any variable not delures 
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down due to uncaught exception.')
    process.exit(1);
});
//uncaught example
//sdfasdfdfdf is not defined so it causes uncaught
//console.log(sdfasdfdfdf);

mongoConnection()
const errorMiddleware = require('./middlewares/errors');

const app=express()
app.use(express.json())

app.use("/api/v1",jobRoutes)

// Middleware to handle errors
app.use(errorMiddleware);
const PORT=process.env.PORT
app.listen(PORT,()=>console.log(`Server: ${process.env.PORT}`))



// Handling Unhandled Promise Rejection
//occurs due to error in configuration ex, error in mongodb url
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to Unhandled promise rejection.')
    server.close( () => {
        process.exit(1);
    }) 
});