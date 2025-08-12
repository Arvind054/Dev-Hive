import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    profileUrl:{
       type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    projects:[{
        type: mongoose.Types.ObjectId,
        ref: "projects"
    }]
});
export default mongoose.models.User || mongoose.model('User', userSchema);