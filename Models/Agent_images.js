const mongoose = require('mongoose');


const AgentImageSchema=new mongoose.Schema({

    uid:{
        type:String,
        required:true
    },
    imageurl:{
        type:String,
        required:true
    }
})

const AgentImageModel=new mongoose.model('agentimagedb',AgentImageSchema);
module.exports = AgentImageModel;