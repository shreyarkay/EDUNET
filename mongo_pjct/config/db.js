//basic mongodb connection
const mongoose=require('mongoose');

//import dotenv to manage environment variables
//require("dotenv").config();
const MONGO_URI="mongodb://localhost:27017/PJCTMANAGEMENT"

//function to connect to mongodb
const connectDB = async()=> {
    try{
        const conn=await mongoose.connect(MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true    });
            console.log('MongoDB successfully connected')
    }
    catch(error) {
        console.error(error);
        process.exit(1);
    }
    };

    module.exports=connectDB;
