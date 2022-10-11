require("dotenv");
require("express-async-errors");
const connectDB = require("./db/connect");

const express = require("express");
const app = express();


const mainRouter = require("./routes/main");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.static('./public'));
app.use(express.json());

app.use("/api/v1",mainRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port  =  process.env.PORT || 3000;

const start = async()=>{
    try{
        await connectDB();
        app.listen(port,()=>{
            console.log(`Server running on port ${port}...`);
        })
    }catch(err){
        console.log(err);
    }
}

start();