const mongoose = require("mongoose");

const connectDB = async() =>{
    try{
        const conn = await mongoose.connect(process.env.mongo_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            dbName: "Encypher",
        });

        console.log(`mongodb connected: ${conn.connection.host}`);
    }catch(error){
        console.log(`ERROR : ${error.message}`)
        process.exit();
    }
}

module.exports = connectDB;