import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    imageUrl:{
        type: String
    },
    tags:[{
      type: String,
    }],
    userEmail:{
        type: String,
        required: true,
    }
});

export default mongoose.models.Project || mongoose.model('Project', projectSchema);