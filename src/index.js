//use try catch always when using database
//database is in another continent meaning use async await

import dotenv from "dotenv";

import mongoose from "mongoose";    
import connectDB from "./db/index.js";

dotenv.config();




connectDB();





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