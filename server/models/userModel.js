import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please add the user name"]
    },
    email:{
        type:String,
        required:[true,"Please add the contact email adress"],
        unique:[true,"Email address already taken"]
    },
    password:{
        type:String,
        required:[true,"Please fill password field"]
    }
},{
    timestamp:true
});

const userModel = mongoose.model("User", userSchema);

export default userModel;