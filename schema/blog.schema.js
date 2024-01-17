import mongoose from "mongoose";
const schema =new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    blog:{
        type:String,
        required:true
    }
});
export default mongoose.model.blogs || mongoose.model("blog",schema);
