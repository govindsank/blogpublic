import express from "express";
import router from "./router.js";
import dotenv from "dotenv";
import conn from "./connection.js";
import { error } from "console";

dotenv.config();
 
const blogg=express();
blogg.use(express.json({
    limit: "10mb"
}));
blogg.use(express.urlencoded({extended:true}));
blogg.use(("/static"),express.static("./static"))
blogg.use("/",router);
conn().then(()=>{
    blogg.listen(process.env.PORT,(error)=>{
        if(error){
            return console.log(error);
        }
        console.log(`server statrt at port ${process.env.PORT}`);
    })
})
.catch(error =>{
    console.log(error);
})