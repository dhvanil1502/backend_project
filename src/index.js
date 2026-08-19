//use try catch always when using database
//database is in another continent meaning use async await

import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import connectDB from "./db/index.js";
// import {app} from "./app.js"



connectDB()
.then(()=>{
    app.on("error",(err)=>{
             console.log(err);
             throw err;
    });
    app.listen(process.env.PORT||8000,()=>{
        console.log(`server running at port : ${process.env.PORT}`);
    });
})
.catch((err)=>{
    console.log("MongoDB connection failed !! ",err);
})

// import express from "express";
// const app=express();
// (async ()=>{
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//         app.on("error",(err)=>{
//             console.log(err);
//             throw err;
//         })
//         app.listen(process.env.PORT,()=>{
//             console.log(`app is listening on ${process.env.PORT}`);
//         })
//     }
//     catch(err){
//         console.error("Error:",err)
//         throw err
//     }
// })()
