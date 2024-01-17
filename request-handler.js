import userModel from "./schema/login.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import auth from "./auth.js";
import blogSchema from "./schema/blog.schema.js";
import loginSchema from "./schema/login.schema.js";

const {sign}=jwt;

export async function register(req,res){
    try {
        let {image,username,password}=req.body;
        let userExist=await userModel.findOne({username});
        if(userExist){
            return res.status(400).send("user already exist or username already taken !!!");
        }
        if(username && password && image){
            let hashedpass=await bcrypt.hash(password,10);
            let result=await userModel.create({
                image,
                username,password:hashedpass
            });
            return res.json("register successful");
        }
        return res.status(400).send("username or password cant't be empty");
        
    } catch (error) {
        if(error){
        console.log(error);
        res.status(500).send(error);
    }
    }
}

export async function login(req,res){
    try {
        let {username,password}=req.body;
        let user=await userModel.findOne({username});
        if(!user){
            return res.status(400).send("wrong credentials");
        }
        if(username && password){
            let match= await bcrypt.compare(password,user.password);
            if(match){
                let token=await sign({
                    username:user.username,
                    id:user._id
                },process.env.SECRET_KEY,{
                    expiresIn:"24h"
                });
                return res.status(200).json({
                    msg:"login successfull!!!",
                    token
                });
            }
            return res.status(400).send("username or passowrd invalid");
        }
        return res.status(400).send("username or password cant be empty");
    } catch (error) {
        if(error){
            console.log(error);
            return res.status(500).send("error");
        }
    }
}
export async function view(req,res){
    try {
        let {username}=req.body;
           let view=await blogSchema.find();
            console.log(view);
            return res.status(200).json(view);
    } catch (error) {
        console.log(error);
    }
}
export async function upload(req,res){
    try {
        let {username,blog}=req.body;
        let userExist=await userModel.find({username});
        if(userExist){
            // return res.status(400).send("user already exist or username already taken !!!");
            if(username && blog){
                let result=await blogSchema.create({
                    username,
                    blog
                });
                return res.json("upload successfull");
            }
        }
        
        // return res.status(400).send("username or password cant't be empty");
        
    } catch (error) {
        if(error){
        console.log(error);
        res.status(500).send(error);
    }
    }

}
export async function profile(req,res){
    try {
        let {id}=req.user;
        let user=await userModel.findOne({_id:id});
        if(user){
            return res.json(user);
        }
    } catch (error) {
        if(error){
            console.log(error);
            res.status(500).send("error");
        }
    }
    
}
export async function vblog(req,res){
    try {
        let {id, username}=req.user;
        let user=await userModel.findOne({_id:id});
        console.log(user);
        console.log(username);
        if(user){
            let viewblog=await blogSchema.find({username})
            console.log(viewblog);
            return res.json(viewblog);
        }
    } catch (error) {
        if(error){
            console.log(error);
            res.status(500).send("error");
        }
    }
    
}

export async function test(req,res){
    res.json(`server started at port ${process.env.Port}`);
}