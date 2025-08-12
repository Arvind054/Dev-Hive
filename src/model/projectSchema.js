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
    liveLink:{
        type: String,
    },
    codeLink:{
        type: String,
    },
    userEmail:{
        type: String,
        required: true,
    },
    views:{
        type: Number,
        default: 0,
    },
    stars:{
        type: Number,
        default: 0,
    },
    createdAt:{
        type: Date,
        default: Date.now
    },

});

export default mongoose.models.Project || mongoose.model('Project', projectSchema);