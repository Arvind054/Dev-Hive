import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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