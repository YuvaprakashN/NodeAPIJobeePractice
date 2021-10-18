const mongoose=require("mongoose")

const mongooseConnection=()=>{ mongoose.connect(process.env.DB_LOCAL_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
 }).then((con)=>console.log(`Mongo DB: ${con.connection.host}`)).catch(err=>console.log("DB connection failed: "+err))
}

module.exports=mongooseConnection