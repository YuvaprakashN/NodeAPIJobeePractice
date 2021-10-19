const express=require("express")
const dotEnv=require("dotenv")

dotEnv.config({path:"./config/config.env"})
const jobRoutes=require("./routes/jobs")
const mongoConnection=require("./config/database")
const fileUpload = require('express-fileupload');

const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
// Handling Uncaught Exception
//It should above all declearation to handle un caught exception
// it occurs if any variable not delures 
// process.on('uncaughtException', err => {
//     console.log(`ERROR: ${err.message}`);
//     console.log('Shutting down due to uncaught exception.')
//     process.exit(1);
// });
//uncaught example
//sdfasdfdfdf is not defined so it causes uncaught
//console.log(sdfasdfdfdf);

const rateLimit=require("express-rate-limit")

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200 // limit each IP to 100 requests per windowMs
  }); 
  
  const helmet = require("helmet");
  //  apply to all requests
  

mongoConnection()
const errorMiddleware = require('./middlewares/errors');
const ErrorHandler = require("./utils/errorHandler")
const auth=require("./routes/auth")
const userRoute=require("./routes/user")
const app=express()

app.use(express.json())
app.use(limiter);
app.use(helmet())
const hpp = require('hpp');
const cors = require('cors');
// Sanitize data
//if we login using json as {"email":"{$gt:''}","password":"pass"}} ir return token
//to prevent this we use mongoSanitize
app.use(mongoSanitize());

// Prevent XSS attacks
// it prevent post data as scripts
app.use(xssClean());

// Prevent Parameter Pollution
app.use(hpp({
    whitelist: ['positions']
}));

// Setup CORS - Accessible by other domains
app.use(cors());

// Set cookie parser
app.use(cookieParser());
// Handle file uploads
app.use(fileUpload());
app.use("/api/v1",jobRoutes)
app.use('/api/v1', auth);
app.use('/api/v1', userRoute);

// Handle unhandled routes
//It should be decleared after all routes
app.all('*', (req, res, next) => {
    next(new ErrorHandler(`${req.originalUrl} route not found`, 404));
});



// Middleware to handle errors
app.use(errorMiddleware);
const PORT=process.env.PORT
app.listen(PORT,()=>console.log(`Server: ${process.env.PORT}`))



// Handling Unhandled Promise Rejection
//occurs due to error in configuration ex, error in mongodb url
// process.on('unhandledRejection', err => {
//     console.log(`Error: ${err.message}`);
//     console.log('Shutting down the server due to Unhandled promise rejection.')
//     server.close( () => {
//         process.exit(1);
//     }) 
// });