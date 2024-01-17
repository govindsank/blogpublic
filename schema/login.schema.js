import mongoose from "mongoose";
const schema = new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});
export default mongoose.model.logs || mongoose.model("log",schema);