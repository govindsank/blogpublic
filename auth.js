
import jwt from "jsonwebtoken";

const {verify}=jwt;

export default async function auth(req,res,next){
    try {
        let token=req.headers.authorization.split(" ")[1];
        let user=await verify(token,process.env.SECRET_KEY);
        if(user){
            req.user=user;
            return next();
        }
        return req.status(500).send("some error occured");
    } catch (error) {
        return res.status(401).send("unautherised access!!");
    }
}